<template>
	<div ref="wrapper" class="warpper">
		<b-scroll
			ref="scroll"
			:options="options"
			:scroll-events="['scroll']"
			@scroll="onScrollHandle"
			@pulling-down="onPullingDown"
			@pulling-up="onPullingUp"
		>
			<ul class="list-wrapper">
				<li v-for="item in list" class="list-item">{{ item }}</li>
			</ul>
			<template slot="pulldown" slot-scope="props">
				<div
					v-if="props.pullDownRefresh"
					class="cube-pulldown-wrapper"
					:style="props.pullDownStyle"
				>
					<div
						v-if="props.beforePullDown"
						class="before-trigger"
						:style="{ paddingTop: props.bubbleY + 'px' }"
					>
						<span :class="{ rotate: props.bubbleY > 0 }">↓</span>
					</div>
					<div class="after-trigger" v-else>
						<div v-show="props.isPullingDown" class="loading">
							<cube-loading></cube-loading>
						</div>
						<transition name="success">
							<div v-show="!props.isPullingDown" class="text-wrapper">
								<span class="refresh-text">今日头条推荐引擎有x条更新</span>
							</div>
						</transition>
					</div>
				</div>
			</template>
		</b-scroll>
	</div>
</template>

<script>
import BScroll from '@/components/BetterScroll'
export default {
	components: {
		BScroll,
	},
	data() {
		return {
			scrollbar: true,
			scrollbarFade: true,
			startY: 0,
			list: [],
		}
	},
	computed: {
		options() {
			return {
				scrollbar: this.scrollbarObj,
				startY: this.startY,
				pullDownRefresh: {
					threshold: 60,
					// stop: 44,
					stopTime: 1000,
					txt: '更新成功',
				},
				pullUpLoad: true,
			}
		},
		scrollbarObj: function() {
			return this.scrollbar ? { fade: this.scrollbarFade } : false
		},
	},
	created() {
		this.getData()
	},
	mounted() {},
	methods: {
		getData() {
			this.list = [...new Array(200).keys()]
			console.log(this.list)
		},
		onScrollHandle(pos) {
			console.log(pos)
			// this.pullDownY = pos.y
			// if (pos.y > 0) {
			//   this.pullDownStyle = `top:${pos.y}px`
			//   this.triggerSurpriseFlag = false
			//   if (this.pullDownY > 90) {
			//     this.triggerSurpriseFlag = true
			//   }
			// }
			// this.$refs.topHeader.style.opacity = this.headerStyle
		},
		onPullingDown() {
			console.log(122)
			// if (this.triggerSurpriseFlag) {
			//   this.triggerSurprise = true
			//   this.$refs.scroll.forceUpdate()
			//   return
			// }
			// setTimeout(() => {
			//   this.$refs.scroll.forceUpdate()
			// }, 1000)
		},
		onPullingUp() {
			setTimeout(() => {
				this.content = this.content.concat(imgs)
			}, 1000)
		},
	},
}
</script>

<style lang="less" scoped>
.warpper {
	height: 100%;
	overflow: hidden;
}
.list-item {
	text-align: center;
	line-height: 88px;
	height: 88px;
	border-bottom: 5px solid #bebebe;
}
</style>
