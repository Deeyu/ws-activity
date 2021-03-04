// 1.4.15
export const MAPKEY = 'e12e6e76d6c6362c02efe99c2d9c4c5c'
export const MapCityName = '深圳'
export const MAPCDN = `https://webapi.amap.com/maps?v=2.0&key=${MAPKEY}&callback=initAMap`
export const MAPUICDN = 'https://webapi.amap.com/ui/1.0/main-async.js'
export const MAPSTYLE = 'amap://styles/8d38d1f84081b12c9d324adc9831898b'
const MAPGLKEY = 'QY3BZ-QQTWK-FFSJ5-AA5I2-T67IK-NZF45'
// 腾讯地图
export const QQMAPGL = `https://map.qq.com/api/gljs?v=1.exp&key=${MAPGLKEY}&callback=initAMapGL&libraries=visualization`
export const OSSURL = 'https://wsjc-web.oss-cn-shenzhen.aliyuncs.com/carMobile/images/'
// 神策服务地址
export const SA_SERVER_URL = `https://sensors-datasink.wsecar.com/sa?project=${process.env
	.VUE_APP_SENSORS || 'default'}`

export const MD5SING = 'DHHjTQf2ERQbw1oYXtBoqfnFeH1DcFv5Mr0f0B3vfao'


// export const BASE_URL = process.env.VUE_APP_BASE_API
// export const BASE_URL = process.env.VUE_APP_BASE_API_DEV
// export const BASE_URL = process.env.VUE_APP_BASE_API_DEV1
// export const BASE_URL = process.env.VUE_APP_BASE_API_TEST
// export const BASE_URL = process.env.VUE_APP_BASE_API_TEST1
// export const BASE_URL = process.env.VUE_APP_BASE_API_TEST2
export const BASE_URL = process.env.VUE_APP_BASE_API_UAT

// export const BASE_URL_DRIVER = process.env.VUE_APP_BASE_API_DRIVER
// export const BASE_URL_DRIVER = process.env.VUE_APP_BASE_DRIVER_API_DEV
// export const BASE_URL_DRIVER = process.env.VUE_APP_BASE_DRIVER_API_DEV1
// export const BASE_URL_DRIVER = process.env.VUE_APP_BASE_API_DRIVER_TEST
// export const BASE_URL_DRIVER = process.env.VUE_APP_BASE_API_DRIVER_TEST1
// export const BASE_URL_DRIVER = process.env.VUE_APP_BASE_API_DRIVER_TEST2
export const BASE_URL_DRIVER = process.env.VUE_APP_BASE_API_DRIVER_UAT
