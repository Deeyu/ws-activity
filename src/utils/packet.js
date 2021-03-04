import tool from './tool'
function change() {
	if (tool.getQueryString('deviceId') && tool.getQueryString('token')) {
		return tool.getQueryString('deviceId')
	} else {
		return tool.getUUID()
	}
}
export let packet = {
	channel: tool.getQueryString('channel') || sessionStorage.getItem('wschannel') || '10600001',
	deviceId: change(),
	op: '',
	platform: tool.getQueryString('platform') || '3',
	softVersion: tool.getQueryString('softVersion') || 'H5',
	sysVersion: tool.getQueryString('sysVersion') || 'H5',
}
export default packet
