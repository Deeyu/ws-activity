// ssr support
export const inBrowser = typeof window !== 'undefined'
export const ua = inBrowser && navigator.userAgent.toLowerCase()
export const isAndroid = ua && ua.indexOf('android') > 0
export const isIOS = ua && /iphone|ipad|ipod|ios/.test(ua)

export function getIOSVersion() {
	const regex = /os (\d\d?_\d(_\d)?)/
	const matches = regex.exec(ua)
	if (!matches) return null
	const parts = matches[1].split('_').map(function(item) {
		return parseInt(item, 10)
	})
	return {
		major: parts[0],
		minor: parts[1],
		patch: parts[2] || 0,
	}
}
