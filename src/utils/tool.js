import { Toast } from 'vant'
export default {
	trim(val) {
		if (!val) {
			return val
		}
		val = val + ''
		return val.replace(/^\s+/, '').replace(/\s+$/, '')
	},
	// 保留指定位数
	toFixedDecimal(value, scale) {
		let defaultValue = 0.0
		if (!value || isNaN(parseFloat(value))) {
			value = defaultValue
		}
		if (!scale) {
			scale = 2
		}
		value = parseFloat(value)
		return value.toFixed(scale)
	},
	// 获取数据类型，返回结果为 Number、String、Object、Array等
	getRawType(value) {
		return Object.prototype.toString.call(value).slice(8, -1)
	},
	/**
	 * 深拷贝
	 * @param {*} obj 拷贝对象(object or array)
	 */
	deepClone(target) {
		// 定义一个变量
		let result
		// 如果当前需要深拷贝的是一个对象的话
		if (typeof target === 'object') {
			// 如果是一个数组的话
			if (Array.isArray(target)) {
				result = [] // 将result赋值为一个数组，并且执行遍历
				for (let i in target) {
					// 递归克隆数组中的每一项
					result.push(this.deepClone(target[i]))
				}
				// 判断如果当前的值是null的话；直接赋值为null
			} else if (target === null) {
				result = null
				// 判断如果当前的值是一个RegExp对象的话，直接赋值
			} else if (target.constructor === RegExp) {
				result = target
			} else {
				// 否则是普通对象，直接for in循环，递归赋值对象的所有值
				result = {}
				for (let i in target) {
					result[i] = this.deepClone(target[i])
				}
			}
			// 如果不是对象的话，就是基本数据类型，那么直接赋值
		} else {
			result = target
		}
		// 返回最终结果
		return result
	},
	/**
	 * 生成并获取uuid（假设备号——缺点：不同浏览器打开都会生成新的）
	 */
	getUUID() {
		let uuid = window.localStorage.getItem('uuid')
		if (!uuid) {
			let d = new Date().getTime()
			uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
				let r = (d + Math.random() * 16) % 16 | 0
				d = Math.floor(d / 16)
				return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
			})
			window.localStorage.setItem('uuid', uuid)
		}
		return uuid
	},
	/** 返回url的参数值 */
	getQueryString(name) {
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
		let result = decodeURI(window.location.search.substr(1)).match(reg)
		return result ? unescape(result[2]) : null
	},
	/** 数组去重 */
	unique(arr) {
		return Array.from(new Set(arr))
	},
	sliceArr(array, size) {
		let result = []
		for (let x = 0; x < Math.ceil(array.length / size); x++) {
			let start = x * size
			let end = start + size
			result.push(array.slice(start, end))
		}
		return result
	},
	// 时间格式化
	fromDateTostring(date, format = 'yyyy-MM-dd hh:mm:ss', cn = false) {
		let o = {
			'M+': date.getMonth() + 1, //month
			'd+': date.getDate(), //day
			'h+': date.getHours(), //hour
			'm+': date.getMinutes(), //minute
			's+': date.getSeconds(), //second
			'w+': date.getDay(), //星期
			'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
			S: date.getMilliseconds(), //millisecond
		}
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		for (let k in o)
			if (k === 'w+') {
				let weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
				let day = weekDay[date.getDay()]
				format = format.replace('w', day)
			} else if (new RegExp('(' + k + ')').test(format))
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
				)
		if (cn) {
			let now = new Date()
			if (now.getDate() == date.getDate()) {
				return '今天 ' + format
			} else if (now.getDate() + 1 == date.getDate()) {
				return '明天 ' + format
			} else {
				return o['M+'] + '月' + o['d+'] + '日 ' + format
			}
		}
		return format
	},
	// 单位转换 元转分
	regYuanToFen(m) {
		if (!parseFloat(m)) {
			return 0
		}
		return Math.round(m * 100)
	},
	// 单位转换 分转元, float = true 保留两位小数,不足两位则补0；false 没有小数位或不足两位，不补0
	regFenToYuan(m, float = true) {
		if (!parseInt(m)) {
			return '0.00'
		}
		let num = Math.round((m / 100) * 100) / 100
		return float ? num.toFixed(2) : num
	},
	// 单位转换 米转公里 float = true 保留一位小数,不足则补0；false 没有小数位，不补0
	regRiceToKm(m, float = true) {
		if (!parseInt(m)) {
			return '0.0'
		}
		let num = Math.round((m / 1000) * 100) / 100
		return float ? num.toFixed(1) : num
	},
	// 单位转换 公里转米
	regKmToRice(m) {
		if (!parseFloat(m)) {
			return 0
		}
		return Math.round(m * 1000)
	},
	// 单位转换 分转秒
	regMinuteToSecond(m) {
		if (!parseInt(m)) {
			return 0
		}
		return Math.round(m * 60)
	},
	// 单位转换 秒转分
	regSecondToMinute(m) {
		if (!parseInt(m)) {
			return '0'
		}
		return parseInt(m / 60) + ''
	},
}

// 浏览器类型
export const getPlatformType = () => {
	const ua = navigator.userAgent,
		isWindowsPhone = /(?:Windows Phone)/.test(ua),
		isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
		isAndroid = /(?:Android)/.test(ua),
		isFireFox = /(?:Firefox)/.test(ua),
		// isChrome = /(?:Chrome|CriOS)/.test(ua),
		isTablet =
			/(?:iPad|PlayBook)/.test(ua) ||
			(isAndroid && !/(?:Mobile)/.test(ua)) ||
			(isFireFox && /(?:Tablet)/.test(ua)),
		isPhone = /(?:iPhone)/.test(ua) && !isTablet,
		isWexin = ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
		isAli = ua.toLowerCase().match(/AlipayClient/i) == 'alipayclient',
		isPc = !isPhone && !isAndroid && !isSymbian,
		isMobile = !!ua.match(/AppleWebKit.*Mobile.*/) //是否为移动终端
	// ios = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	return {
		isTablet, // 平板
		isPhone,
		isAndroid,
		isPc,
		isMobile,
		isWexin,
		isAli,
	}
}
export const iosFix = () => {
	// ios禁止缩放
	// 阻止双击放大
	let lastTouchEnd = 0
	document.addEventListener('touchstart', function(event) {
		if (event.touches.length > 1) {
			event.preventDefault()
		}
	})
	document.addEventListener(
		'touchend',
		function(event) {
			var now = new Date().getTime()
			if (now - lastTouchEnd <= 300) {
				event.preventDefault()
			}
			lastTouchEnd = now
		},
		false
	)
	// 阻止双指放大
	document.addEventListener('gesturestart', function(event) {
		event.preventDefault()
	})
}
//封装操作localstorage本地存储的方法

export const ws_storage = {
	//存储
	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	},
	//取出数据
	get(key) {
		try {
			return JSON.parse(localStorage.getItem(key))
		} catch (e) {
			return localStorage.getItem(key)
		}
	},
	// 删除数据
	remove(key) {
		localStorage.removeItem(key)
	},
}
// 判断数据是不是数组类型的数据
export const isArray = arr => {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
export const isObject = obj => {
	return Object.prototype.toString.call(obj) == '[object Object]'
}

export const isString = fun => {
	return Object.prototype.toString.call(fun) == '[object String]'
}

export const isUndefined = str => {
	return Object.prototype.toString.call(str) == '[object Undefined]'
}

// 高德重写了location的toSting方法
export const locationConvert = parm => {
	if (!parm) {
		return parm
	}
	if (parm.location && isArray(parm.location)) {
		let [lng, lat] = parm.location
		parm.location = {
			lat,
			lng,
		}
	} else if (parm.location && isObject(parm.location)) {
		let { lng, lat } = parm.location
		parm.location = {
			lat,
			lng,
		}
	}
	return parm
}
/**
 * 在一个连续操作行为中，每间隔delay的时间触发1次。
 * 函数在一段时间内多次触发只会执行第一次，在这段时间结束前，不管触发多少次也不会执行函数。
 * 频率控制(函数节流) 返回函数连续调用时，func 执行频率限定为 次 / wait
 * @from underscore源码注解 https://www.cnblogs.com/guanine/p/9623325.html
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
export const throttle = function(func, wait = 300, options) {
	let context, args, result
	let timeout = null
	// 上次执行时间点
	let previous = 0
	if (!options) options = {}
	// 延迟执行函数
	let later = function() {
		// 若设定了开始边界不执行选项，上次执行时间始终为0
		previous = options.leading === false ? 0 : Number(new Date())
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}
	return function(..._args) {
		let now = Number(new Date())
		// 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
		if (!previous && options.leading === false) previous = now
		// 延迟执行时间间隔
		let remaining = wait - (now - previous)
		context = this
		args = _args
		// 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
		// remaining大于时间窗口wait，表示客户端系统时间被调整过
		if (remaining <= 0 || remaining > wait) {
			clearTimeout(timeout)
			timeout = null
			previous = now
			result = func.apply(context, args)
			if (!timeout) context = args = null
			//如果延迟执行不存在，且没有设定结尾边界不执行选项
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
		return result
	}
}
/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @description 函数防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
 * @param  {function} func        传入函数，最后一个参数是额外增加的this对象，.apply(this, args) 这种方式，this无法传递进函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export const debounce = function(func, wait = 300, immediate = true) {
	let timeout, args, context, timestamp, result

	const later = function() {
		// 据上一次触发时间间隔
		let last = Number(new Date()) - timestamp

		// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.call(context, ...args, context)
				if (!timeout) {
					context = args = null
				}
			}
		}
	}

	return function(..._args) {
		context = this
		args = _args
		timestamp = Number(new Date())
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) {
			timeout = setTimeout(later, wait)
		}
		if (callNow) {
			result = func.call(context, ...args, context)
			context = args = null
		}

		return result
	}
}

/**
 * @description 拉起app
 * @param {string} [type='passenger'] app类型 默认乘客端
 */
export const openAppClient = (type = 'passenger') => {
	type = type != 'driver' ? 'passenger' : 'driver'
	const APPDOWNLOAD = {
		driver: [
			'https://itunes.apple.com/cn/app/%E4%B8%87%E9%A1%BA%E8%BD%A6%E4%B8%BB/id1186532674?mt=8',
			'http://android.myapp.com/myapp/detail.htm?apkName=com.wsecar.wsjcsj&ADTAG=mobile',
			'http://android.myapp.com/myapp/detail.htm?apkName=com.wsecar.wsjcsj&ADTAG=mobile',
		],
		passenger: [
			'https://itunes.apple.com/cn/app/id1180877789?mt=8',
			'wsjc://com.wsecar.wsjc/splash',
			// 'http://wsjc.oss-cn-shenzhen.aliyuncs.com/app/dw/share/wsjc_h5.apk',
			'http://android.myapp.com/myapp/detail.htm?apkName=com.wsecar.wsjc&ADTAG=mobile', // 腾讯应用宝
		],
	}
	let url = APPDOWNLOAD[type]
	let { isWexin, isPhone, isAndroid } = getPlatformType()
	if (isWexin) {
		window.open(url[2])
		// Dialog.alert({
		//   title: '万顺叫车',
		//   message: '点击右上角按钮，然后在弹出的菜单中，点击在' + (isPhone ? 'Safari' : '浏览器') + '中打开，即可安装',
		// }).catch(res => {
		//   console.log(res)
		// })
	} else if (isPhone) {
		window.location.href = url[0]
	} else if (isAndroid) {
		window.location.href = url[1]
		Toast.loading('加载中...')
		setTimeout(() => {
			window.location.href = url[1]
			setTimeout(() => {
				let windowHidden =
					window.document.hidden ||
					window.document.mozHidden ||
					window.document.msHidden ||
					window.document.webkitHidden
				if (!windowHidden) {
					window.open(url[2])
				}
			}, 3000)
		}, 1000)
	} else {
		window.open(url[2])
	}
}

/**
 * @description 复制文本
 * @param {String} text 复制的内容
 */
export const clipboard = text => {
	let oInput = document.createElement('input')
	oInput.value = text
	document.body.appendChild(oInput)
	oInput.select()
	document.execCommand('Copy')
	oInput.remove()
}
