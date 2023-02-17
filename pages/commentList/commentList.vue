<template>
	<view>
		<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
		  <commentBox @commentReply='commentReply' :commentData="item"></commentBox>
		</view>
		<uni-load-more v-if="commentList.length == 0 || commentList.length > 5 ||loading=='noMore'" :status="loading"></uni-load-more>
		<comment @sendCommentData='sendCommentData'@closePopupMasker='isShowCom = $event' :isShowCom="isShowCom"></comment>
	</view>
</template>

<script>
	export default {
		onLoad(params){
			this.articleId = params.id
			this.getCommentList()
		},
		onReachBottom(){
			if(this.loading == 'noMore'){
				return
			}
			this.page++;
			this.getCommentList()
		},
		data() {
			return {
				articleId:'',
				page:1,
				pageSize:5,
				commentList:[],
				loading:'loading',
				isShowCom:false,
				replyData:{}
			}
		},
		methods: {
			async getCommentList(){
				const list = await this.$http.getCommentList({
					articleId:this.articleId,
					page:this.page,
					pageSize:this.pageSize
				})
				if(list.length == 0){
					this.loading = 'noMore'
					return
				}
				this.commentList.push(...list);
			},
			async sendCommentData(commentVal){
				const data = await this.$http.updateComment({
					userId:this.userInfo._id,
					articleId:this.articleId,
					content:commentVal,
					...this.replyData
				})
				uni.showToast({
					title:data.msg
				})
				this.isShowCom = false;
				this.page = 1;
				this.loading = 'loading';
				this.replyData = {};
				this.commentList = [];
				this.getCommentList();
			},
			async showCom(){
				await this.checkLogin();
				this.isShowCom = true;
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
			}
		},
	}
</script>

<style lang="scss">
.comment-content-container{
	padding: 0 30rpx;
	border-bottom: 1px solid #eee;
}
</style>
