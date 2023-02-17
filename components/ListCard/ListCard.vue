<template>
	<view class="list-card" v-if="item.mode == 'base'" @click="goArticleDetail">
		<!-- 单图模式 -->
		<view class="list-card-img">
			<!-- 图片填充满 -->
			<!-- 判断数据里有没有图片，没有用本地图 -->
			<image :src="item.cover[0] ? item.cover[0]:'/static/img/logo.jpeg'" alt="" mode='aspectFill'></image>
		</view>
		<view class="list-card-content">
			<view class="list-card-content-tit">
				<text>{{item.title}}</text>
				<SaveLikes :item = 'item' :articleId = 'item._id'></SaveLikes>
			</view>
			<view class="list-card-content-desc">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-number">
					{{item.browse_count+ '浏览'}}
				</view>
			</view>
		</view>
	</view>
	<view class="list-card mode-column" v-else-if="item.mode == 'column'" @click="goArticleDetail">
		<!-- 多图模式 -->
		<view class="list-card-top">
			<text>{{item.title}}</text>
			<SaveLikes :item = 'item'></SaveLikes>
		</view>
		<view class="list-card-middle">
			<!-- 截取三张图 -->
			<view class="img-container" v-for="(item,i) in item.cover.slice(0,3)" :key="item._id">
				<image :src="item" alt="" mode='aspectFill'></image>
			</view>
		</view>
		<view class="list-card-content-desc list-card-bottom">
			<view class="article-type">
				{{item.classify}}
			</view>
			<view class="browse-number">
				{{item.browse_count+ '浏览'}}
			</view>
		</view>
	</view>
	<view class="list-card mode-image" v-else-if="item.mode == 'image'" @click="goArticleDetail">
		<!-- 大图模式 -->
		<view class="list-card-top">
			<!-- 图片填充满 -->
			<view class="img-container">
				<image :src="item.cover[0]" alt="" mode='aspectFill'></image>
			</view>
		</view>
		<view class="list-card-middle">
				<text>{{item.title}}</text>
				<SaveLikes :item = 'item' :articleId = 'item._id'></SaveLikes>
		</view>
		<view class="list-card-content-desc list-card-bottom">
			<view class="article-type">
				{{item.classify}}
			</view>
			<view class="browse-number">
				{{item.browse_count+ '浏览'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ListCard",
		props:{
			item:Object
		},
		data() {
			return {
				
			};
		},
		methods:{
			goArticleDetail(){
				this.$emit('saveHistory')
				const { _id, title, author, create_time, thumbs_up_count, browse_count } = this.item
				      const params = { _id, title, author, create_time, thumbs_up_count, browse_count };
				//跳转到详情页
				// uni.navigateTo({
				// 	url:`/pages/arcDetail/arcDetail?params=${JSON.stringify(params)}`
				// })
				this.$Router.push({
					path:`/pages/arcDetail/arcDetail`,
					query:params
				})
			}
		}
	}
</script>

<style lang="scss">
.list-card{
	@include flex();
	padding: 20rpx;
	margin: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0 0 10px 2rpx rgba(0,0,0,.1);
	.list-card-img{
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		overflow: hidden;
		flex-shrink: 0;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.list-card-content{
		@include flex(space-between,column);
		padding-left: 20rpx;
		width: 100%;
		.list-card-content-tit{
			@include flex();
			align-items: flex-start;
			font-size: 28rpx;
			color: #333333;
			font-weight: 400;
			line-height: 1.2;
			text{
				overflow: hidden;
				text-overflow: ellipsis;//文字溢出显示省略号
				display: -webkit-box;
				-webkit-line-clamp: 2;//文字只显示两行
				-webkit-box-orient: vertical;//设置方向？
			}
		}
		
	}
	.list-card-content-desc{
		@include flex();
		font-size: 24rpx;
		margin-top: 20rpx;
		width: 100%;
		.article-type{
			padding: 0 10rpx;
			margin-right: 10rpx;
			border-radius: 30rpx;
			color: $base-color;
			border: 1px solid $base-color;
		}
		.browse-number{
			color: $c-9;
			line-height: 1.5;
		}
	}
	// 多图和大图的公共样式
	
	.list-card-top,
.list-card-middle,
	.list-card-bottom{
		@include flex();
		width: 100%;
	}
		// 多图模式
	&.mode-column{
		flex-direction: column;
		.list-card-top{
			text{
				font-size: 28rpx;
				color: #333333;
			}
		}
		.list-card-middle{
			margin: 20rpx 0;
			.img-container{
				width: 32%;
				border-radius: 10rpx;
				height: 140rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	&.mode-image{
		flex-direction: column;
		.img-container{
			width: 100%;
			height: 200rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.list-card-middle{
			margin-top: 10rpx;
			text{
				font-size: 28rpx;
				color: #333333;
			}
		}
	}
}

</style>