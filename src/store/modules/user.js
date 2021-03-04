/* 用户中心状态管理 */
import * as types from '../mutation-types'
import { disconnect } from '@/utils/mqtt'
const state = {
	userInfo: null, // 用户信息
}
const getters = {
	userInfo: state => {
		return state.userInfo
	},
}
const mutations = {
	[types.SET_USER_IFNO](state, params) {
		//登录用户信息
		state.userInfo = { ...state.userInfo, ...params }
	},
	[types.CLEAR_USER_IFNO](state) {
		state.userInfo = null
		disconnect()
	},
}
const actions = {
	// 登录
	loginAction({ commit }, params) {
		// return loginApi(params).then(res => {
		commit(types.SET_USER_IFNO, params)
		// })
	},
	// 退登
	logoutAction({ commit }) {
		commit(types.CLEAR_USER_IFNO)
	},
}
export default {
	namespaced: true, //多出的一行
	state,
	mutations,
	actions,
	getters,
}
