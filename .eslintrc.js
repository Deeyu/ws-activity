module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
		browser: true,
	},
	// 全局变量
	globals: {
		AMap: true,
		AMapUI: true,
		Paho: true,
		Toast: true,
		AMapLoader: true,
		WeixinJSBridge: true,
		wx: true,
		ws: true,
		Activity: true,
	},
	// extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],'plugin:vue/recommended', 
	extends: ['plugin:vue/vue3-essential','eslint:recommended', '@vue/prettier'],
	// plugins: ['prettier', 'vue'],
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 6, //启用 ES6 语法支持;默认设置为3，5（默认）， 你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）
		ecmaFeatures: {
			//支持装饰器
			legacyDecorators: true,
		},
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'prettier/prettier': 'error',
		"no-irregular-whitespace": "off", //这禁止掉 空格报错检查
		// "indent": ['warn', 4]
	},
}
