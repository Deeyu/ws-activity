import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { BASE_URL, BASE_URL_DRIVER } from './config'
import packet from './packet'
// 免登接口
let whiteListApi = []
// 创建 axios 实例
const http = axios.create({
	baseURL: BASE_URL, //基础url,如果是多环境配置这样写，也可以像下面一行的写死。
	timeout: 6000, //请求超时时间
	headers: {
		'Access-Control-Allow-Origin': '*',
		Accept: 'application/json,text/plain,*/*; charset=utf-8',
	},
})

http.interceptors.request.use(
	config => {
		const userInfo = store.getters['user/userInfo']
		let token = null
		let sslUrl = null
		if (userInfo) {
			//免登接口不传token
			token = whiteListApi.includes(config.url) ? null : userInfo.token
			sslUrl = userInfo.sslUrl
		}
		if (sslUrl) {
			config.baseURL = sslUrl
		} else if (!config.baseURL) {
			config.baseURL = BASE_URL
		}
		//空数据不传
		if (config.data) {
			let paramsKey = Object.keys(config.data)
			if (paramsKey.length == 0) {
				config.data = { ...packet, token }
			} else {
				config.data = { ...packet, data: JSON.stringify(config.data), token }
			}
		} else {
			config.data = { ...packet, token }
		}
		console.log('请求参数', config.data)
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

//response interceptor（接收拦截器）
http.interceptors.response.use(
	response => {
		const res = response.data
		if (!res) {
			Toast({ message: '系统繁忙,请稍后再试', forbidClick: true })
			return
		}
		if (res.code !== 1) {
			//Toast({ message: res.msg || '系统繁忙', forbidClick: true })
			if (res.code == -13) {
				//store.commit('user/' + CLEAR_USER_IFNO, null)
			}
			return Promise.reject(res)
		} else {
			try {
				console.log('响应结果', JSON.parse(res.data))
				return JSON.parse(res.data)
			} catch (e) {
				//openid 返回字符串
				return res.data
			}
		}
	},
	error => {
		console.log('err', error) //for debug
		if (error instanceof Error) {
			Toast({ message: '系统繁忙 请稍后再试', forbidClick: true })
		}
		return Promise.reject(error)
	}
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = ({ url, ...config }) => {
	setDriverURL(config)
	return http.get(url, config)
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} [type = passenger] [请求的baseUrl类型, 默认为乘客服务]
 */
const post = ({ url, params = {}, ...config }) => {
	setDriverURL(config)
	return http.post(url, params, config)
}

function setDriverURL(config) {
	if (config.serviceType == 'driver') {
		config.baseURL = BASE_URL_DRIVER
		delete config.serviceType
	}
}
export { get, post, http }
