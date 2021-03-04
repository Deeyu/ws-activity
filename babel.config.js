const isProd = process.env.NODE_ENV === 'production'
const plugins = []
if (isProd) {
	plugins.push('transform-remove-console')
}
plugins.push([
	'import',
	{
		libraryName: 'vant',
		libraryDirectory: 'es',
		// style: true,
		// 指定样式路径
		style: name => `${name}/style/less`,
	},
	'vant',
])
module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins: [
		...plugins,
		// 可选链插件, 其他babel插件也是一样的安装方式
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-nullish-coalescing-operator', // 空位合并运算符,左侧的值为 undefined 或 null，则其求值为右侧的值
	],
}
