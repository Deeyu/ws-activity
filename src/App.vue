<template>
	<!-- <transition name="van-fade">
		<router-view />
	</transition> -->
	<router-view v-slot="{ Component }">
		<transition name="van-fade">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
