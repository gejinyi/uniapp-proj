<template>
  <view class="comment-box">
    <view class="comment-header">
      <view class="comment-header-logo">
        <image :src="commentData.author.avatar" mode="aspectFill"></image>
      </view>
      <view class="comment-header-info">
        <view class="title" v-if="!commentData.is_reply">
          {{commentData.author.author_name}}
        </view>
		  <!-- 当评论为指定评论的时候，进行为谁回复的提示信息 -->
		        <view v-else class="title">
		           {{commentData.author.author_name}} 
		           <text class="reply-text">回复</text>
		           {{commentData.to}}
		        </view>
        <view class="">
          <uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
        </view>
      </view>
    </view>
    <!-- 内容部分 -->
    <view class="comment-content">
      <view class="">
        {{commentData.comment_content}}
      </view>
      <view class="comment-info">
        <view class="comment-button" @click="commentReply({comment:commentData,isReply})">
          回复  
        </view>
      </view>
		<view class="comment-reply-list" v-for="item in commentData.replyArr":key="item.comment_id" >
	        <commentBox :isReply="true" @commentReply="commentReply" :commentData="item"></commentBox>
	    </view>
    </view>
  </view>
</template>

<script>
	import commentBox from './commentBox'
export default {
	
	name:'commentBox',
  props :{
    commentData:Object,
	isReply: {
	      type: Boolean,
	      default: false
	    }
  },
  methods:{
	  commentReply(data){
		        if (data.isReply) {
		          data.comment.reply_id = data.comment.comment_id
		          data.comment.comment_id = this.commentData.comment_id
		        }
		  this.$emit('commentReply',data)
	  }
  },
    components: {
      commentBox,
    },
}
</script>

<style  lang="scss">
.comment-box {
    margin: 30rpx 0;
    .comment-header {
        @include flex(flex-start);
        align-items: flex-start;
        .comment-header-logo {
            flex-shrink: 0;
            width: 60rpx;
            height: 60rpx;
            border-radius: 10rpx;
            overflow: hidden;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .comment-header-info {
            @include flex(flex-start, column);
            align-items: flex-start;
            padding-left: 30rpx;
            font-size: 24rpx;
            color: $c-9;
            line-height: 1;
            .title {
                margin-bottom: 20rpx;
                font-size: 28rpx;
                color: #333;
				.reply-text{
					margin: 0 20rpx;
					font-weight: bold;
					color: #000;
				}
            }
        }
    }
    .comment-content {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #000;
        .comment-info {
            margin-top: 30rpx;
            display: flex;
            .comment-button {
                padding: 4rpx 20rpx;
                font-size: 24rpx;
                color: $c-9;
                border-radius: 40rpx;
                border: 1px solid #ccc;
            }
        }
		.comment-reply-list {
		            padding-left: 40rpx;
		            border: 2px solid #f5f5f5;
		            transform: scale(.9)
		        }
    }

}


</style>