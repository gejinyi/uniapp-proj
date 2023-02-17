<template>
	<view class="tab-bar">
		<scroll-view class="tab-scroll" scroll-x="true" :scroll-with-animation="true" :scroll-into-view="currentId">
			<ul class="tab-scroll-box">
				<li class="tab-scroll-item"  @click='changeContent(i)' v-for="(item,i) in lableList" :key="i" :class='{active:activeIndex == i}' :id='`item${i}`'>{{item.name}}</li>
			</ul>
		</scroll-view>
		<view class="tab-icon">
			<uni-icons @click="goLabelAdMin" type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TabBar",
		props:{
			lableList:Array,
			activeIndex:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
				currentId:'item0',
				// list:['斗罗大陆','斗破苍穹','山河剑心','少年歌行','不良人','墓王之王']
			};
		},
		methods:{
			changeContent(i){
				this.$emit('changeContent',i)
			},
			async goLabelAdMin(){
				await this.checkLogin()
				uni.navigateTo({
					url:'/pages/lableAdMin/lableAdMin'
				})
			}
		},
		watch:{
			activeIndex(index) {
				this.currentId = `item${index}`
			}
		},
	}
</script>

<style lang="scss">
	.tab-bar{
		@include flex();
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
		background-color: #ffffff;
		box-sizing: border-box;
		.tab-scroll{
			flex: 1;
			box-sizing: border-box;
			height: 90rpx;
			overflow: hidden;
			.tab-scroll-box{
				@include flex(flex-start);
				height: 90rpx;
				box-sizing: border-box;
				.tab-scroll-item{
					list-style: none;
					color: #333333;
					font-size: 28rpx;
					padding: 0 20rpx;
					flex-shrink: 0;
					&.active{
						color: $base-color;
					}
				}
			}
		}
		.tab-icon{
			width: 90rpx;
			position: relative;
			@include flex(center)
			&:after{
				content: '';
				position: absolute;
				left: 0;
				height: 32rpx;
				width: 2rpx;
				background-color: #ddd;
			}
		}
	}

</style>