import { getIOSVersion, isIOS } from '@/utils/env'
export function getRect(el) {
	if (el instanceof window.SVGElement) {
		let rect = el.getBoundingClientRect()
		return {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height,
		}
	} else {
		return {
			top: el.offsetTop,
			left: el.offsetLeft,
			width: el.offsetWidth,
			height: el.offsetHeight,
		}
	}
}

const camelizeRE = /-(\w)/g
export function camelize(str) {
	str = String(str)
	return str.replace(camelizeRE, function(m, c) {
		return c ? c.toUpperCase() : ''
	})
}

function getUseTransition() {
	let useTransition = true
	if (isIOS) {
		const version = getIOSVersion()
		if (!version) return useTransition

		if (version.major >= 13 && version.minor >= 3) {
			useTransition = false
		}
	}
	return useTransition
}

// fix the scrolling problem in iOS13.4 webview
export const USE_TRANSITION = getUseTransition()
