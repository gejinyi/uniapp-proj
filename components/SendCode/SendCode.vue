<template>
	<view class="code-container">
		<view class="vCode-btn"  @click="getForm">
			{{runTime ? `${time}秒后重新获取`:"获取验证码"}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"SendCode",
		data() {
			return {
				//计时器
				timeId:null,
				time:60,
				runTime:false
			}
		},
		beforeDestroy(){
			clearInterval(this.timeId);
			this.runTime = false;
			this.time = 60;
			this.timeId = null
		},
		methods:{
			getForm () {
				if(this.runTime) return
				this.$emit('getForm',this.sendCode)
			},
			async sendCode (form) {
				const { phone } = await form.validateField(['phone']);
				//创建定时器
				this.runTime = true;
				this.tiemRunning()
				//发送手机号
				const {mobileCode,msg} = await this.$http.getCode({ phone })
				uni.showToast({
					title:msg,
					icon:"none"
				})
				this.$emit('registCode',mobileCode)
			},
			tiemRunning () {
				//倒计时效果
				if (this.timeId) clearInterval(this.timeId);
				this.timeId = setInterval(()=>{
					if(this.time == 1){
						clearInterval(this.timeId);
						this.runTime = false;
						this.time = 60;
						this.timeId = null
						return
					}
					this.time--
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	.code-container {
		flex-shrink: 0;
		margin-right: 20rpx;
		.vCode-btn {
			background-color: $base-color;
			color: #FFFFFF;
			padding: 20rpx;
			border-radius: 10rpx;
			opacity: .8;
		}
	}
</style>
