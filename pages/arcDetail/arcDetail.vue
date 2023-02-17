<template>
	<view class="article-detail-container">
		<view class="detail-title">
			{{articleData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="articleData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{articleData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{articleData.create_time}}</text>
					<text>{{articleData.browse_count+'浏览'}}</text>
					<text>{{articleData.thumbs_up_count+'赞'}}</text>
				</view>
			</view>
			<button @click="likeAuthor" type="default" class="detail-header-button">{{
				isLikeAuthor ? '取消关注':'关注'
			}}</button>
		</view>
		<view class="detail-content-container">
			<view class="detail-html">
				<u-parse :content="content" />
			</view>
		</view>
		<!-- 评论内容区 -->
		      <view class="detail-comment">
		        <view class="comment-title">最新评论</view>
		        <view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
		          <commentBox @commentReply='commentReply' :commentData="item"></commentBox>
		        </view>
		        <view class="no-data" v-if="!commentList.length">暂无评论</view>
		      </view>
		
		<!-- 评论组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click="showCom">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box" @click="geCommentPage">
					<uni-icons type="chat" size="22" color="#f07373" ></uni-icons>
				</view>
				<SaveLikes class="detail-bottom-icon-box" :item="articleData"></SaveLikes>
				<!-- <view class="detail-bottom-icon-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view> -->
				<view class="detail-bottom-icon-box">
					<uni-icons @click="updateCompoliments" :type='isCompoliments ? "hand-up-filled" :"hand-up"' size="22" color="#f07373"></uni-icons>
				</view>
			</view>
			<comment @sendCommentData='sendCommentData'@closePopupMasker='isShowCom = $event' :isShowCom="isShowCom"></comment>
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/gaoyia-parse/parse.vue'
		import {marked} from 'marked'
	export default {
		data() {
			return {
				articleData:null,
				isShowCom:false,
				commentList:[],
				replyData:{}
			}
		},
		components:{
			uParse
		},
		onLoad(...options){
			 if(options){
				 this.articleData =  this.$Router.currentRoute.query;
				 this.getArcDetail()
				 this.getCommentList()
			 }
		},
		methods: {
			async getArcDetail(){
				const res = await this.$http.getArcDetail({
					article_id:this.articleData._id
				})
				this.articleData = res;
			},
			async showCom(){
				await this.checkLogin();
				this.isShowCom = true;
			},
			async sendCommentData(commentVal){
				const data = await this.$http.updateComment({
					userId:this.userInfo._id,
					articleId:this.articleData._id,
					content:commentVal,
					...this.replyData
				})
				uni.showToast({
					title:data.msg
				})
				this.isShowCom = false;
				this.getCommentList();
				this.replyData = {};
			},
			async getCommentList(){
				const list = await this.$http.getCommentList({
					articleId:this.articleData._id
				})
				this.commentList = list;
			},
			async commentReply(data){
				await this.showCom();
				this.replyData = {
					"comment_id":data.comment.comment_id,
					is_reply: data.isReply
				}
				 // 当前为回复内容的时候添加回复的ID
				      data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
					  this.showCom()
			},
			async likeAuthor(){
				await this.checkLogin();
				const { msg } = await this.$http.updateLikeAuthor({
					authorId:this.articleData.author.id,
					userId:this.userInfo._id,
					articleId:this.articleData._id,
				})
				uni.showToast({
					title:msg
				})
				let followIds = [...this.userInfo.author_likes_ids]
				if(followIds.includes(this.articleData.author.id)){
					//删除
					followIds = followIds.filter((item) => item!== this.articleData.author.id)

				}else{
					//新增
					followIds.push(this.articleData.author.id)

				}
				this.updateUserInfo({
					...this.userInfo,
					author_likes_ids:followIds
				})
				uni.$emit('updateAuthorList')
			},
			async updateCompoliments(){
				await this.checkLogin();
				const { msg } = await this.$http.updateCompoliments({
					userId:this.userInfo._id,
					articleId:this.articleData._id,
				})
				uni.showToast({
					title:msg
				})
				let upIds = [...this.userInfo.thumbs_up_article_ids]
				if(upIds.includes(this.articleData._id)){
					//删除
					upIds = upIds.filter((item) => item!== this.articleData._id)
										this.articleData.thumbs_up_count -=1;
				}else{
					//新增
					upIds.push(this.articleData._id)
										this.articleData.thumbs_up_count +=1;
				}
				this.updateUserInfo({
					...this.userInfo,
					thumbs_up_article_ids:upIds
				})
			},
			geCommentPage(){
				uni.navigateTo({
					url:`/pages/commentList/commentList?id=${this.articleData._id}`
				})
			}
		},
		computed:{
			content(){
				 try {
				        return marked(this.articleData.content)
				      } catch (e) {
				        return null
				      }
			},
			isLikeAuthor(){
				try {
				       return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleData.author.id)
				     } catch (e) {
				       return false
				     }
				
			},
			isCompoliments(){
				try {
				       return this.userInfo && this.userInfo.thumbs_up_article_ids.includes(this.articleData._id)
				     } catch (e) {
				       return false
				     }
				
			}
		}
	}
</script>

<style lang="scss">
	.article-detail-container {
		padding: 30rpx 0 108rpx;
	}
	
	.detail-title {
		padding: 0 30rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.detail-header {
		@include flex(flex-start);
		margin-top:20rpx;
		padding: 0 30rpx;
		.detail-logo {
			flex-shrink: 0;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.detail-header-content {
			width: 100%;
			padding-left: 20rpx;
			@include flex(space-between,column);
			font-size: 24rpx;
			align-items: flex-start;
			.detail-header-content-title {
				font-size: 28rpx;
				color: #333;
			}
			.detail-header-content-info {
				color: $c-9;
				text {
					margin-right: 20rpx;
				}
			}
		}
		.detail-header-button {
			padding: 0 30rpx;
			flex-shrink: 0;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 10rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			background-color: $base-color;
		}
	}
	
	.detail-content-container {
		margin-top: 40rpx;
		// min-height: 1000rpx;
		.detail-html {
			padding: 0 30rpx;
		}
	}
	/* 评论列表样式 */
	    .detail-comment {
	        margin-top: 60rpx;
	        .comment-title {
	            padding: 20rpx 30rpx;
	            font-size: 28rpx;
	            color: #666;
	            border-bottom: 1px solid #ddd;
	        }
	        .comment-content-container {
	            padding: 0 30rpx;
	            border-bottom: 1px solid #eee;
	        }
	        .no-data {
	            width: 100%;
	            text-align: center;
	            padding: 30rpx 0;
	            color: $c-9;
	            font-size: 28rpx;
	        }
	    }
	
	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		@include flex(flex-start);
		width: 100%;
		height: 88rpx;
		border-top: 1px #f5f5f5 solid;
		background-color: #FFFFFF;
		box-sizing: border-box;
		.input-container {
			@include flex();
			margin-left: 20rpx;
			padding: 0 20rpx;
			flex-grow: 1;
			height: 60rpx;
			border: 1px solid #ddd;
			border-radius: 5px;
			text {
				font-size: 28rpx;
				color: $c-9;
			}
		}
		.detail-bottom-icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 20rpx;
		}
		.detail-bottom-icon-box {
			position: relative;
			@include flex(center);
			width: 88rpx;
		}
	}
</style>
