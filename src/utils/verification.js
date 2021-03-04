// 验证手机号
export const verifyPhone = phone => {
	return /^1\d{10}$/.test(phone)
}

// 校验车主注册密码
export const verifyPassword = value => {
	return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)
}
// 验证网址
export const verifyUrl = url => {
	// eslint-disable-next-line
  return /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i.test(
		url
	)
}
