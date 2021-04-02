import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Field, List, Toast, Loading, Popup, NavBar, Dialog, Icon, Tabs, Tab } from 'vant'
import eruda from 'eruda'
import { post } from './utils/http'
import 'normalize.css/normalize.css'
import './assets/style/global.less'
// 自定义主题不能按需加载样式 https://github.com/youzan/vant/issues/1511
import 'vant/lib/index.less'
const app = createApp(App)
// 开发环境下加载调试工具eruda
if (process.env.NODE_ENV === 'development') {
	eruda.init()
}
app.config.isCustomElement = tag => {
	console.log(tag === 'lottie-player')
	return tag === 'lottie-player'
}

// 配置全局属性
// app.config.globalProperties.$message = message;
app.config.globalProperties.$post = post

// 将 Toast 等组件注册到 app 上
app
	.use(Toast)
	.use(Dialog)
	.use(Button)
	.use(Field)
	.use(List)
	.use(Toast)
	.use(Loading)
	.use(Popup)
	.use(NavBar)
	.use(Dialog)
	.use(Icon)
	.use(Tabs)
	.use(Tab)
	.use(store)
	.use(router)
	.mount('#app')
