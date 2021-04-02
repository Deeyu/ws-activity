<template>
	<div>
		<ul class="ul">
			<li class="test">1</li>
			<li class="test">2</li>
			<li class="test">3</li>
			<li class="test">4</li>
			<li class="test">5</li>
			<li class="test test1">6</li>
			<li class="test">7</li>
			<li class="test">8</li>
			<li class="test">9</li>
			<li class="test test1">10</li>
		</ul>
	</div>
</template>

<script>
// 滚动动画
import scrollreveal from 'scrollreveal'
export default {
	components: {},
	data() {
		return {}
	},
	mounted() {
		//1.创建一个scrollReveal对象
		let scroll = scrollreveal()
		let config = {
			reset: true, // 滚动鼠标时，动画开关(默认是false没有打开鼠标滚动的动画开关)
			origin: 'right', // 动画开始的方向
			duration: 200, // 动画持续时间
			delay: 0, // 延迟
			rotate: { x: 0, y: 0, z: 0 }, // 过度到0的初始角度
			opacity: 0.8, // 初始透明度  (0.2到1的效果)
			// scale: 2, //缩放
			easing: 'ease-in-out', //动画效果// 缓动'ease', 'ease-in-out'，'linear'...
			// 回调函数
			//当动画开始之前会被触发
			beforeReveal: function() {
				console.log('动画执行了')
			},
			//鼠标滚轮滚动之前会被触发
			beforeReset: function() {
				console.log('滚轮开始---')
			},
			//动画开始之后会被触发
			afterReveal: function() {
				console.log('动画结束了')
			},
			//滚轮滚动之后会被触发
			afterReset: function() {
				console.log('滚轮结束了')
			},
		}
		//2.调用scrollReveal里的reveal方法将scrollReveal内部的动画和css中的标签关联起来
		scroll.reveal('.test', config)
	},
}
</script>

<style lang="less" scoped>
.test {
	width: 100vw;
	height: 150px;
	background: #be4444;
	border-bottom: 1px solid #ccc;
}
.test1 {
	background: #000;
}
</style>
