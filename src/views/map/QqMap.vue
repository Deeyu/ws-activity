<template>
	<div id="tx_container"></div>
</template>

<script>
import { txMapGLLoader } from '@/utils/mapLoad'
import { onMounted } from 'vue'
export default {
	name: 'TxMap',
	components: {},
	setup(props) {
		console.log(props)
		onMounted(() => {
			txMapGLLoader().then(() => {
				console.log(TMap)
				//定义地图中心点坐标
				let center = new TMap.LatLng(39.98412, 116.307484)
				//定义map变量，调用 TMap.Map() 构造函数创建地图
				let map = new TMap.Map(document.getElementById('tx_container'), {
					viewMode: '2D', // 3D
					center: center, //设置地图中心点坐标
					zoom: 17.2, //设置地图缩放级别
					pitch: 0, //设置俯仰角
					rotation: 45, //设置地图旋转角度
					showControl: false, // 是否显示地图上的控件
				})
				//初始化散点图并添加至map图层
				let dot = new TMap.visualization.Dot({
					faceTo: 'screen', //散点固定的朝向
					selectOptions: {
						//拾取配置
						action: 'click', //拾取动作 hover
						style: {
							//选中样式
							fillColor: '#1CD5FF',
						},
						enableHighlight: false, //是否使用高亮效果
					},
				}).addTo(map)
				// .setData(dotData) //设置数据
				//绑定点击事件
				dot.on('click', evt => {
					console.log(evt)
					// if (evt.detail.dot) {
					// } else {
					// }
				})
				//修改地图中心点
				// var centerLatLng=map.getCenter();
				//修改地图中心点
				// map.setCenter(new TMap.LatLng(lat,lng));
			})
		})
	},
	data() {
		return {}
	},
}
</script>

<style lang="less" scoped>
#tx_container {
	height: 100vh;
}
</style>
