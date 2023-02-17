<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
							<!-- 状态栏垫片 -->
			<view :style="{
				height:statusHeight + 'rpx'
			}">
			</view>
			
			<view class="return-icon" :style="{
				height:statusHeight + 'rpx'
			}" v-if="isSearch">
				<uni-icons @click="returnArticleList" type="back" size="22" color="#fff"></uni-icons>
			</view>
			
			
			<view @click="goSearchPage()" class="nav-bar-conent" :style="{marginRight:marginRight + 'rpx'}">
				<uni-icons type="search" color="#999"></uni-icons>
				<view class="nav-bar-search-txt" v-if="!isSearch">
					请输入文章标题
				</view>
				<input v-model.trim="searchValue" @confirm="changeInput" confirm-type="search" type="text" v-else class="search-input" placeholder="请输入文章标题">
			</view>
		</view>
		<view :style="{
				height:statusHeight + 80 + 'rpx'
			}">
			<!-- 内容区垫片 -->
		</view>

	</view>
</template>

<script>
	export default {
		name:"NavBar",//方便devtool进行查找
		data() {
			return {
				statusHeight:20,
				marginRight:0
			}
		},
		props:{
			isSearch:{
				type:Boolean,
				default:false
			},
			parentValue:{
				type:String
			}
		},
		created(){
			this.getSystemInfo()
		},
		methods:{
			getSystemInfo(){
				const resp = uni.getSystemInfoSync();
				if(resp.statusBarHeight > 0){
					this.statusHeight = resp.statusBarHeight
				}
				// #ifdef MP-WEIXIN   
				// 微信小程序端
					// 获取胶囊尺寸
				const butInfo = uni.getMenuButtonBoundingClientRect();
				this.statusHeight = butInfo.height*2;
				this.marginRight = butInfo.width*2;
				// #endif
				
			},
			changeInput(){
				this.$emit('sendSearchValue')
			},
			goSearchPage(){
				if(!this.isSearch){
					uni.navigateTo({
						url:'/pages/search/search'
					})
				}
			},
			returnArticleList() {
							// #ifdef H5
							uni.switchTab({
								url: '/pages/index/index'
							})
							// #endif
							// #ifndef H5
							uni.navigateBack()
							// #endif
			
						}
		},
		computed:{
			searchValue:{
				get(){
					return this.parentValue
				},
				set(val){
					this.$emit('updateVal',val)
					if(!val) {
						this.$emit('sendSearchValue')
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	
.nav-bar{
	.nav-bar-top{
		position: fixed;
		z-index: 99;
		left: 0;
		top: 0;
		width: 100%;
		background-color: $base-color;
		padding: 0 30rpx 20rpx;
		box-sizing: border-box;
		.nav-bar-conent{
			@include flex(flex-start);
			height: 60rpx;
			background-color: #fff;
			border-radius: 30rpx;
			padding-left: 20rpx;
			box-sizing: border-box;
			flex-grow: 1;
			margin-left: 10rpx;
			.nav-bar-search-txt{
				font-size: 28rpx;
				width: 100%;
				margin-left: 20rpx;
				color: $c-9;
			}
		}
	}
	 /* 搜索界面单独添加样式 */
	    .return-icon {
	        position: absolute;
	        left: 0;
	        top: 50%;
	        height: 60rpx;
	        @include flex(center);
			transform: translateY(-50%);
	    }
	    .search-input {
	        font-size: 28rpx;
	        color: #999;
	        width: 100%;
	        text-indent: 20rpx;
	    }
}

</style>