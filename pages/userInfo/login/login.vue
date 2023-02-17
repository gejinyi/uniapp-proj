<template>
	<view class="login-container">
			<image src="../../../static/img/login_bg.png" class="banner-bg" mode=""></image>
			<!-- 导航 -->
			<view class="login-nav">
				<view class="nav-item" @click="changeType('account')" :class="{'active':type==='account'}">
					账号登录
				</view>
				<view class="nav-item" @click="changeType('mobile')" :class="{'active':type !=='account'}">
					手机登录 
				</view>
			</view>
			<!-- 表单部分 -->
			<uni-forms class="form" ref="form" :modelValue="formData">
				<view class="" v-if="type =='account'">
					<uni-forms-item label="账号" name="loginName">
						<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入账号" v-model="formData.loginName" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="password">
						<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input" type="password" placeholder="请输入密码" v-model="formData.password" ></uni-easyinput>
					</uni-forms-item>
				</view>
				<view class="" v-else>
					<uni-forms-item label="手机号" name="phone">
						<input placeholder-class="placeholder" class="form-input" type="number" placeholder="请输入手机号" v-model="formData.phone" />
					</uni-forms-item>
					<uni-forms-item label="验证码" name="vCode">
						<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入验证码" v-model="formData.vCode" />
						<SendCode @registCode='currentCode = $event' @getForm='sendFrom' class="code-component"></SendCode>
					</uni-forms-item>
				</view>
				
				<button class="login-btn" @click="loginSubmit">立即登录</button>
			</uni-forms>
			<view class="footer-select-container">
				<text>注册</text>
				<text>忘记密码</text>
			</view>
		</view>
</template>

<script>
	export default {
		onReady() {
		    this.$refs.form.setRules(this.userRules)
		  },
		data() {
			return {
				type:'account',
				formData:{
					loginName:'',
					password:'',
					phone:'',
					vCode:''
				},
				currentCode:''
			}
		},
		methods: {
			async loginSubmit(){
				const result = await this.$refs.form.validate()
				this.sendUserInfo({
					...result,
					type:this.type
				})
			},
			sendFrom(callback){
				callback(this.$refs.form)
			},
		 changeType(type){
				this.type = type;
				this.$refs.form.clearValidate([])
			},
			async sendUserInfo(data){
				// 发送数据到后端
				const result = await this.$http.userInfo(data);
				if (result){
					uni.showToast({
						title:'用户登录成功',
						icon:'none'
					})
					this.updateUserInfo(result)
					setTimeout(()=>{
						// #ifdef H5
						uni.switchTab({
							url:'/pages/index/index'
						})
						// #endif
						//#ifndef H5
						uni.navigateBack({
							//回到之前的页面
						})
						//#endif
					},1500)
					
				}
			},
			
		}
	}
</script>

<style lang="scss">
.login-container {
	background-color: #F8F8F8;
	width: 100%;
	.banner-bg {
		width: 100%;
		height: 400rpx;
	}
	.login-nav {
		@include flex();
		padding: 0 146rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: $c-9;
		.nav-item {
			position: relative;
			margin-bottom: 40rpx;
			&.active {
				color: $base-color;
				&:after {
					content: "";
					position: absolute;
					bottom: -20rpx;
					width: 60rpx;
					left: 50%;
					transform: translateX(-50%);
					height: 8rpx;
					border-radius: 4rpx;
					background-color: $base-color;
				}
			}
		}
	}
	.footer-select-container {
		width: 640rpx;
		margin: 20rpx auto;
		@include flex();
		color: $c-9;
		font-size: 26rpx;
		text-decoration: underline;
	}
}

/deep/ .uni-forms-item__content {
	@include flex(flex-start,center);
	padding-left: 40rpx;
}

/deep/ .uni-forms-item {
	padding-left: 30rpx ;
	border-bottom: 1px solid #eee;
	background-color: #fff;
}

/deep/ .uni-forms-item__inner {
	padding-bottom: 24rpx;
}
/deep/ .uni-easyinput__content-input{
	padding-left: 0 !important
}
/deep/.uni-input-placeholder.uni-easyinput__placeholder-class{
	font-size: 32rpx;
}
/deep/ .label-text span {
	font-size: 32rpx !important;
}


.placeholder {
	color: #999;
}

.login-btn {
	width: 640rpx;
	height: 90rpx;
	border-radius: 10rpx;
	background-color: $base-color;
	color: #FFFFFF;
	font-size: 32rpx;
	@include flex(center);
	margin-top: 80rpx;
}
</style>
