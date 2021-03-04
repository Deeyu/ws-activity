<template>
	<div id="container"></div>
</template>

<script>
import { wsAMapLoader } from '@/utils/mapLoad'
import { onMounted } from 'vue'
let mapInstance = null

export default {
	name: 'GaodeMap',
	components: {},
	setup() {
		onMounted(() => {
			wsAMapLoader().then(AMap => {
				mapInstance = new AMap.Map('container', {
					zoom: 10, //设置地图显示的缩放级别
					center: [116.397428, 39.90923], //设置地图中心点坐标
					// mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
					viewMode: '2D', //设置地图模式
				})
			})
		})
	},
}
</script>

<style lang="less" scoped>
#container {
	height: 100vh;
}
</style>
