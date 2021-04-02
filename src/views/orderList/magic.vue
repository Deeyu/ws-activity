<template>
	<div>
		<header></header>
		<div class="section1"></div>
		<div class="section2"></div>
		<div class="section3"></div>
		<div class="section4"></div>
		<footer></footer>
	</div>
</template>

<script>
// 视差滚动动画
import { Controller, Scene } from 'scrollmagic'
export default {
	components: {},
	data() {
		return {}
	},
	mounted() {
		// 1.创建一个控制器对象
		let controller = new Controller()
		// 2.创建一个场景对象(一个控制器对象下可以创建多个场景)
		let scene = new Scene({
			// 告诉ScrollMagic从什么位置开始当前的场景
			// offset: 100,
			offset: 0,
			// 告诉ScrollMagic当前的场景从哪一个元素开始
			// triggerElement: "footer",
			// triggerElement: ".section3",
			triggerElement: 'header',
			// 告诉ScrollMagic当前的场景从指定元素相对于视口的什么位置开始
			// triggerHook: "onEnter", //进入视口时就触发
			// triggerHook: "onCenter",
			triggerHook: 'onLeave', // 离开时触发
			// 告诉ScrollMagic当前的场景的有效范围
			duration: 200,
			reverse: false,
		})
		// 告诉ScrollMagic哪一个元素需要固定
		scene.setPin('.section1')
		// scene.setPin('.section1', { pushFollowers: false })
		// 3.将场景对象添加到控制器对象（创建 的场景都要添加到控制器对象）
		controller.addScene(scene)
	},
}
</script>

<style lang="less" scoped>
header {
	width: 100%;
	height: 100px;
	background: #000;
}
div {
	width: 100%;
	height: 200px;
}
.section1 {
	background: red;
}
.section2 {
	background: green;
}
.section3 {
	background: blue;
}
.section4 {
	background: deeppink;
}
footer {
	width: 100%;
	height: 2000px;
	background: #000;
}
</style>
