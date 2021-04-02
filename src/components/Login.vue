<template>
	<form class="page">
		<div class="login">
			<slot name="logo">
				<img class="logo" src="../assets/images/logo.png" />
			</slot>
			<van-field
				v-model="state.phone"
				autocomplete
				class="input"
				type="tel"
				placeholder="请输入手机号"
				:maxlength="11"
			/>
			<van-field
				v-model="state.password"
				autocomplete
				class="input"
				type="password"
				placeholder="请输入验证码"
				:maxlength="4"
			>
				<template v-slot:button>
					<transition name="van-fade" mode="out-in">
						<van-button
							v-if="!state.showTime"
							class="smstext"
							:disabled="smsDisable"
							@click="getSms"
						>
							{{ state.smsBtnText }}
						</van-button>
						<van-count-down
							v-else
							ref="dom"
							class="disable_btn"
							:time="state.time"
							:format="state.format"
							@finish="countTimeFinish"
						/>
					</transition>
				</template>
			</van-field>
			<van-button type="danger" class="btn" round block :disabled="submitDisable" @click="submit"
				>登录</van-button
			>
		</div>
	</form>
</template>

<script>
import { reactive, computed, onUnmounted, ref, watchEffect, watch } from 'vue'
import { CountDown } from 'vant'
import { verifyPhone } from '@/utils/verification'
export default {
	name: 'Login',
	components: {
		[CountDown.name]: CountDown,
	},
	setup(props) {
		console.log(props)
		const state = reactive({
			phone: '',
			password: '',
			time: 60000,
			format: 'sss后重新发送',
			smsBtnText: '获取验证码',
			showTime: false,
		})
		const smsDisable = computed(() => {
			return !verifyPhone(state.phone)
		})
		const submitDisable = computed(() => {
			return !(verifyPhone(state.phone) && state.password.length === 4)
		})
		// test watch
		watchEffect(() => {
			console.log(state.phone)
		})
		watch(
			() => state.phone,
			(o, n) => {
				console.log(o, n)
			}
		)
		const countTimeFinish = () => {
			state.showTime = false
			state.smsBtnText = '重新获取'
		}
		const getSms = () => {
			state.showTime = true
		}
		const submit = () => {}
		// ref实列可绑定到模板ref上
		const dom = ref(null)
		onUnmounted(() => {
			dom.value?.reset()
		})
		return {
			state,
			submitDisable,
			smsDisable,
			countTimeFinish,
			submit,
			getSms,
			dom,
		}
	},
}
</script>

<style scoped lang="less">
.page {
	height: 100vh;
}
.login {
	padding: 0 20px;
}
.logo {
	margin: 96px 0 65px 0;
	height: 44px;
}
.input {
	margin-top: 25px;
	background: #f5f5f5;
}
.btn {
	margin-top: 40px;
	height: 48px;
	border: none;
	border-radius: 4px;
	font-size: 18px;
	font-weight: bold;
	color: #ffffff;
}
.login :deep(.van-field__button) {
	// /* deep selectors */
	// ::v-deep(.foo) {}
	/* shorthand */
	// :deep(.foo) {}
	display: flex;
	height: 24px;
}
.smstext {
	height: 24px;
	padding: 0;
	background-color: transparent;
	border: none;
	color: #208cf2;
	font-size: 14px;
}
.disable_btn {
	height: 24px;
	line-height: 24px;
	font-size: 14px;
	color: @red;
	opacity: 0.4;
}
.smstext[disabled] {
	color: #999999;
}
</style>
