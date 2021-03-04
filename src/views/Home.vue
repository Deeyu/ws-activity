<template>
	<div class="home">
		<lottie-player
			autoplay
			loop
			mode="normal"
			:src="require('../assets/json/test.json')"
			style="width: 100vw;height: 300px;"
		/>
		<div id="ani"></div>
		<div id="fireworks"></div>
		<div id="fireworks2"></div>
	</div>
</template>

<script>
// web components 组件 :src="require('../assets/json/test.json')"
import lottie from 'lottie-web'
import '@lottiefiles/lottie-player'
import { onMounted } from 'vue'
export default {
	name: 'Home',
	setup() {
		onMounted(() => {
			const animation = lottie.loadAnimation({
				container: document.getElementById('ani'), // the dom element
				renderer: 'svg', // canvas
				loop: true,
				autoplay: false,
				path: 'https://assets5.lottiefiles.com/packages/lf20_QPewua.json',
			})

			animation.addEventListener('DOMLoaded', () => {
				animation.playSegments([180, 206], true)
			})
			lottie.loadAnimation({
				container: document.getElementById('fireworks'), // the dom element
				renderer: 'svg',
				loop: true,
				autoplay: true,
				animationData: require('../assets/json/fireworks.json'),
				// animationData, // [必须] data.json文件
				// path, // data.json文件路径(animationData/path选其一传入即可)
			})
			const fireworks = lottie.loadAnimation({
				container: document.getElementById('fireworks2'), // the dom element
				renderer: 'svg',
				loop: true,
				autoplay: false,
				animationData: require('../assets/json/fireworks2.json'),
				// animationData, // [必须] data.json文件
				// path, // data.json文件路径(animationData/path选其一传入即可)
			})
			// 开始播放动画
			fireworks.play()
			fireworks.addEventListener('DOMLoaded', () => {
				console.log(13)
			})
		})
	},
}
</script>
<style lang="less" scoped>
#ani {
	height: 200px;
}
#fireworks {
}
</style>
