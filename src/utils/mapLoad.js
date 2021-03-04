import AMapLoader from '@amap/amap-jsapi-loader'
import { MAPKEY, QQMAPGL } from './config'
// 腾讯地图 MAPGL
export function txMapGLLoader() {
	return new Promise((resolve, reject) => {
		if (window.TMap) {
			resolve(window.TMap)
		} else {
			var script = document.createElement('script')
			script.type = 'text/javascript'
			script.async = true
			script.src = QQMAPGL
			script.onerror = reject
			document.head.appendChild(script)
			window.initAMapGL = () => {
				resolve(window.TMap)
			}
		}
	})
}
// 使用加载器挂载高德地图
export function wsAMapLoader({ version = '2.0', plugins } = {}) {
	return AMapLoader.load({
		//首次调用 load
		key: MAPKEY, //首次load key为必填
		version, // 1.4.6
		plugins: plugins || [
			'AMap.Geolocation',
			'AMap.CitySearch',
			'AMap.Geocoder',
			'AMap.PlaceSearch',
			'AMap.AutoComplete',
		],
	})
}
