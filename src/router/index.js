import { createRouter, createWebHistory } from 'vue-router'
import activityRouter from './modules/activity'
const routes = [
	{
		path: '/',
		name: 'Home',
		redirect: '/index',
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '@/components/Login.vue'),
	},
	{
		path: '/index',
		name: 'Home',
		// 2.?
		component: () => import(/* webpackChunkName: "home" */ '@views/Home.vue'),
	},
	{
		path: '/chart',
		name: 'Chart',
		// 2.?
		component: () => import(/* webpackChunkName: "chart" */ '@views/chart/index.vue'),
	},
	{
		path: '/map',
		component: () => import('@views/map/index.vue'),
		children: [
			{
				path: 'gaodeMap',
				name: 'GaodeMap',
				component: () => import('@views/map/Gaode.vue'),
				meta: {
					title: '高德地图',
				},
			},
			{
				path: 'txMap',
				name: 'TxMap',
				component: () => import('@views/map/QqMap.vue'),
				meta: {
					title: '腾讯地图',
				},
			},
		],
	},
	{
		path: '/orderList',
		name: 'OrderList',
		// 2.?
		component: () => import(/* webpackChunkName: "chart" */ '@views/orderList/magic'),
	},
	{
		path: '/scroll',
		name: 'Scroll',
		// 2.?
		component: () => import(/* webpackChunkName: "chart" */ '@/views/orderList/scroll'),
	},
	{
		path: '/activity',
		children: [...activityRouter],
	},
	{
		path: '/:catchAll(.*)',
		name: '404',
		redirect: '/index',
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		console.log(to, from, savedPosition)
		// 始终滚动到顶部
		return { top: 0 }
		// return 期望滚动到哪个的位置
		// 始终在元素 #main 上方滚动 10px
		// return {
		// 也可以这么写
		// el: document.getElementById('main'),
		// el: '#main',
		// top: -10,
		// }
	},
})

// 前置守卫

router.beforeEach((to, form, next) => {
	console.log(to, form)
	// 返回 false 以取消导航
	next()
})
// 后置钩子
router.afterEach((to, from) => {
	document.title = to.meta?.title ?? '万顺叫车'
})

export default router
