import { Client } from '@/assets/js/paho-mqtt'
import packet from '@/utils/packet'
import store from '@/store'
//全局
let client
//乘客订阅的TOPIC
// let CLIEN_TOPIC = '/passenger/server/to/client/'
//断线重新连接的时间
const RECONNECT_TIME = 3000
//消息防抖时间
const MSG_DEBOUNCE = 300
//消息监听队列
const messageListens = []
export const isConnected = () => {
	return client && client.isConnected()
}
/**
 * 连接mqtt
 */
export const connect = () => {
	if (isConnected()) {
		return
	}
	const userInfo = store.getters['user/userInfo']
	if (!userInfo) {
		return
	}
	const { mqttIpAddr, token, mqttSslPort, mqttClientId, userId } = userInfo
	if (!mqttIpAddr) {
		return
	}
	//重连
	let resatrt = (() => {
		let timer = 0
		return () => {
			if (timer === 0) {
				timer = setTimeout(() => {
					timer = 0
					if (!isConnected()) {
						client.connect(param)
					}
				}, RECONNECT_TIME)
			}
		}
	})()
	const param = {
		userName: userId + '',
		password: JSON.stringify({
			...packet,
			token,
			url: '/gateway/connect',
		}),
		onFailure: e => {
			console.warn(e, 'onFailure')
			resatrt()
		},
		useSSL: true,
	}
	client = new Client(mqttIpAddr, mqttSslPort, mqttClientId)
	client.onConnectionLost = e => {
		console.warn(e, 'onConnectionLost')
		if (e.code === 5) {
			return
		}
		// resatrt();
	}
	// client.onConnected = () => {
	//   // console.log('onConnected')
	//   // subscribe();
	//   client.subscribe(CLIEN_TOPIC + userId)
	// }
	let timer = 0
	client.onMessageArrived = ({ payloadString }) => {
		const message = JSON.parse(payloadString)
		message.data = message.data && JSON.parse(message.data)
		let isGps = message.url.indexOf('uploadGps') > -1
		!isGps && console.log(message.url, message.msg, message.data, payloadString)
		clearTimeout(timer)
		timer = setTimeout(() => {
			for (let i = messageListens.length - 1; i >= 0; i--) {
				const { url, callback } = messageListens[i]
				let res
				if (Array.isArray(url)) {
					if (url.includes(message.url)) {
						!isGps && console.log('exec', message.url)
						res = callback(message)
					}
				} else if (message.url == url) {
					!isGps && console.log('exec', message.url)
					res = callback(message)
				}
				if (res === false) {
					break
				}
			}
		}, MSG_DEBOUNCE)
	}
	client.connect(param)
}
//消息缓存id
let messageListensIndex = 0
/**
 * 添加mqtt消息监听 多次绑定多次调用
 * 最后添加的消息先执行
 * @param {(string|string[])} url 消息url 多种消息
 * @param {Function} callback 消息回调并传入消息 返回false将结束消息遍历
 * @returns {number} 消息的key 用于移除监听
 */
export const addMessageListens = (url, callback) => {
	if (!callback) {
		return
	}
	messageListens.push({ key: ++messageListensIndex, url, callback })
	return messageListensIndex
}
/**
 * 移除mqtt消息监听
 * @param {number|Array} key 添加时返回的key 可以为数组
 */
export const removeMessageListens = key => {
	const rm = key => {
		messageListens.some((item, index) => {
			if (item.key == key) {
				messageListens.splice(index, 1)
				return true
			}
		})
	}
	if (Array.isArray(key)) {
		key.map(i => rm(i))
	} else {
		rm(key)
	}
}
/**
 * 断开mqtt消息
 */
export const disconnect = () => {
	client && client.isConnected() && client.disconnect()
}
/**
 * 模拟发送mqtt消息
 * @param {object} message 模拟发送的消息
 */
export const testMessage = message => {
	client.onMessageArrived({ payloadString: JSON.stringify(message) })
}

setTimeout(() => {
	// console.log('12312123123123123123')
	// testMessage({
	//   token: null,
	//   imei: null,
	//   softVersion: null,
	//   sysVersion: null,
	//   platform: null,
	//   channel: null,
	//   deviceId: null,
	//   url: '/carOrder/exp/confirmCharge',
	//   code: 1,
	//   msg: '响应成功',
	//   data:
	//     '{"orderPrice":1476,"createTime":"2020-05-18 11:27:35","discountMoney":0,"concessionarAmount":1476,"derateMoney":0,"accountMoney":null,"otherFee":100,"qrCodeUrl":"https://carmobile-uat.wsecar.com/carMobile/pay/payWayPassenger.html?orderInfo\\u003dMTAyMDIwNDQwMzA2MTUwMzc5MjNfMTU4OTc4NzU0NTM4MV8xMDIxMDA5MzE0MjY4XzEzX251bGw\\u003d\\u0026orderPrice\\u003d1476\\u0026carNum\\u003d%E7%B2%A4BD1778B\\u0026areaCode\\u003d440306\\u0026androidUrl\\u003dfeature.ui.acivity.wallet.CashierActivity\\u0026iosUrl\\u003dpayWayPassenger","driverOrderCount":21,"ordersTotal":2,"payType":null,"prePayPrice":null,"hasPrePay":false,"isPrePay":false,"haveCoupon":true,"isRefund":false,"refundPriice":null,"stillNeedPrice":null,"orderId":"10202044030615037923","orderStatus":50,"orderType":20,"money":null}',
	//   createTime: 1589787545411,
	// })
}, 5000)
