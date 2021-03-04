<template>
	<!-- <div>数据报表</div> -->
	<div id="map"></div>
</template>

<script>
// 全国行政区划GeoJON 支持省市县维度
// https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json
import { Scene, PointLayer, Marker, MarkerLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
// import { WorldLayer, DrillDownLayer } from '@antv/l7-district'
import { onMounted, reactive } from 'vue'
export default {
	components: {},
	setup(props, ctx) {
		console.log(props, ctx)
		function addMarkers(scene) {
			fetch(
				'https://gw.alipayobjects.com/os/basement_prod/67f47049-8787-45fc-acfe-e19924afe032.json'
			)
				.then(res => res.json())
				.then(nodes => {
					const markerLayer = new MarkerLayer()
					for (let i = 0; i < nodes.length; i++) {
						if (nodes[i].g !== '1' || nodes[i].v === '') {
							continue
						}
						const el = document.createElement('label')
						el.className = 'labelclass'
						el.textContent = nodes[i].v + '℃'
						el.style.background = getColor(nodes[i].v)
						el.style.borderColor = getColor(nodes[i].v)
						const marker = new Marker({
							element: el,
						}).setLnglat({ lng: nodes[i].x * 1, lat: nodes[i].y })
						markerLayer.addMarker(marker)
					}
					scene.addMarkerLayer(markerLayer)
				})
		}

		function getColor(v) {
			const colors = [
				'#ffffe5',
				'#f7fcb9',
				'#d9f0a3',
				'#addd8e',
				'#78c679',
				'#41ab5d',
				'#238443',
				'#005a32',
			]
			return v > 50
				? colors[7]
				: v > 40
				? colors[6]
				: v > 30
				? colors[5]
				: v > 20
				? colors[4]
				: v > 10
				? colors[3]
				: v > 5
				? colors[2]
				: v > 0
				? colors[1]
				: colors[0]
		}
		function setData() {
			fetch(
				'https://gw.alipayobjects.com/os/basement_prod/513add53-dcb2-4295-8860-9e7aa5236699.json'
			)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					const pointLayer = new PointLayer({})
						.source(data)
						.shape('circle')
						.size(5)
						.color('h5', [
							'#0A3663',
							'#1558AC',
							'#3771D9',
							'#4D89E5',
							'#64A5D3',
							'#72BED6',
							'#83CED6',
							'#A6E1E0',
							'#B8EFE2',
							'#D7F9F0',
						])
						.style({
							opacity: 1,
						})
					scene.addLayer(pointLayer)
				})
		}
		let scene = reactive(null)
		onMounted(() => {
			scene = new Scene({
				id: 'map',
				logoVisible: false,
				map: new GaodeMap({
					pitch: 35.210526315789465,
					// style: 'amap://styles/b9ccb2fc823b6a7de0e1436bc6398e4e',
					style: 'dark',
					// center: [104.288144, 31.239692],
					center: [114.060288, 22.53684],
					zoom: 15.63,
					token: '15eadfee418f33cf3cde324f612998dd',
					plugin: [], // 可以不设置
				}),
			})
			scene.on('loaded', () => {
				// const pointLayer = new PointLayer()
				// .source(data)
				// .shape('circle')
				// .size('mag', [1, 25])
				// .color('mag', ['#5B8FF9', '#5CCEA1'])
				// .style({
				// 	opacity: 0.3,
				// 	strokeWidth: 1,
				// })
				// addMarkers(scene)
				// setInterval(() => {
				setData()
				// },3000)
				scene.render()
			})
		})
		return {
			scene,
		}
	},
}
</script>

<style lang="less" scoped>
#map {
	height: 100vh;
}
</style>
