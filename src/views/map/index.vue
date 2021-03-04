<template>
	<div class="map">
		<div class="tab">
			<router-link class="a" active-class="active" :to="{ name: 'GaodeMap' }">高德地图</router-link>
			<router-link class="a" active-class="active" :to="{ name: 'TxMap' }">腾讯地图</router-link>
		</div>
		<div class="content">
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Map',
	components: {},
}
</script>

<style lang="less" scoped>
.active {
	color: red;
}
.map {
	display: flex;
	flex-direction: column;
	.tab {
		height: 44px;
		display: flex;
		align-items: center;
		.a {
			flex: 1;
		}
	}
	.content {
		flex: 1;
	}
}
</style>
