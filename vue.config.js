const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'html']
const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
	return path.join(__dirname, dir)
}
const title = '万顺叫车'
module.exports = {
	publicPath: isProd ? '/production-sub-path/' : '/',
	// 输出文件目录
	outputDir: 'package',
	/* 代码保存时进行eslint检测 */
	lintOnSave: true,
	chainWebpack: config => {
		config.resolve.symlinks(true)
		config.plugin('html').tap(args => {
			args[0].title = title
			args[0].chunksSortMode = 'none'
			return args
		})
		// 预加载
		config.plugin('preload').tap(() => [
			{
				rel: 'preload',
				// to ignore runtime.js
				// https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
				fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
				include: 'initial',
			},
		])
		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@views', resolve('src/views'))
			.set('@api', resolve('src/api'))
		config
			// https://webpack.js.org/configuration/devtool/#dev
			.when(
				!isProd,
				// config => config.devtool('cheap-source-map')cheap-module-eval-source-map
				config => config.devtool('cheap-source-map')
			)
		config.when(isProd, config => {
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [
					{
						// `runtime` must same as runtimeChunk name. default is `runtime`
						inline: /runtime\..*\.js$/,
					},
				])
				.end()
			// 代码分割
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						// test: /[\\/]node_modules[\\/](vue|vue-router|vuex|axios)[\\/]/,
						test: /[\\/]node_modules[\\/]/,
						name: 'chunk-libs',
						priority: 20, // 权重要大于上面的chunk-libs
						chunks: 'all',
					},
					vantUI: {
						test: /[\\/]node_modules[\\/]_?vant(.*)/, // in order to adapt to cnpm
						name: 'chunk-vantUI',
						priority: 20, // 权重要大于上面的chunk-libs
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // can customize your rules
						minChunks: 3, //  分割前必须共享模块的最小块数。
						priority: 5,
						reuseExistingChunk: true, // 如果当前块包含已从主束拆分的模块，则将重用它而不是生成新的块。这可能会影响块的结果文件名。
					},
				},
			})
			config.optimization.runtimeChunk('single')
		})
	},
	configureWebpack: config => {
		const plugins = []
		if (isProd) {
			// 压缩代码
			plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
					threshold: 10240,
					minRatio: 0.8,
				})
			)
		}
		config.plugins = [...config.plugins, ...plugins]
	},
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: !isProd,
		loaderOptions: {
			less: {
				// 使用 Less 提供的 modifyVars 即可对变量进行修改
				javascriptEnabled: true, // 开启 Less 行内 JavaScript 支持
				modifyVars: {
					// 直接覆盖变量
					// red: '#111',
					// 或者可以通过 less 文件覆盖（文件路径为绝对路径）
					hack: `true; @import "${path.join(__dirname, 'src/assets/style/theme.less')}";`,
				},
			},
		},
		// 启用 CSS modules for all css / pre-processor files(v3用modules v4用requireModuleExtension)
		// modules: false,
		requireModuleExtension: true,
	},
	devServer: {
		/* 自动打开浏览器 */
		open: false,
		disableHostCheck: true,
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false, // 热更新
		proxy: {
			// [process.env.VUE_APP_BASE_API]: {
			//   target: process.env.VUE_APP_BASE_URL,
			//   changeOrigin: true
			// }
			// 设置代理
			'/dev-api': {
				// 目标 API 地址
				// 开发环境
				target: 'http://172.16.1.38:7002/',

				// 如果要代理 websockets
				ws: false,
				// 将主机标头的原点更改为目标URL(设置跨域)
				changeOrigin: true,
				pathRewrite: {
					'^/dev-api': '',
				},
			},
		},
		before: () => {},
	},
}
