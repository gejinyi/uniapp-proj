<template>
	<view>
		<uni-popup ref="popup" type="bottom">
					 <!-- 内容区域 -->
			<view class="popup-wrapper">
			  <view class="popup-header">
			    <view class="popup-header-item" @click="closePopupMasker">取消</view>
			    <view class="popup-header-item" @click="sendCommentData">发布</view>
			  </view>
			  <view class="popup-content">
			    <textarea class="popup-content-textarea" v-model.trim="commentsValue" maxlength="200" fixed placeholder="请输入评论内容"></textarea>
			    <view class="popup-content-count">{{commentsValue.length}}/200</view>
			  </view>
			</view>
		</uni-popup>
      
	</view>
</template>

<script>
	export default {
		name:"comment",
		props:{
			isShowCom:Boolean
		},
		watch:{
			isShowCom(newVal){
				newVal ? this.$refs.popup.open('bottom') : this.$refs.popup.close()
			}
		},
		data() {
			return {
				commentsValue:''
			};
		},
		methods:{
			closePopupMasker(){
				//关闭弹窗
				this.$emit('closePopupMasker',false)
			},
			sendCommentData(){
				if(!this.commentsValue){
					uni.showToast({
						title:'请输入评论内容',
						icon:'none'
					})
				}else{
					this.$emit('sendCommentData',this.commentsValue)
					this.commentsValue = ''
					this.closePopupMasker()
				}
				
			}
		}
	}
</script>

<style lang="scss">
.popup-wrapper {
  background-color: #ffffff;
  .popup-header {
    @include flex();
    font-size: 28rpx;
    color: #666;
    border-bottom: 1px solid #f5f5f5; 
    .popup-header-item {
      height: 100rpx;
      line-height: 100rpx;
      padding: 0 30rpx;
    }
  }
  .popup-content {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    .popup-content-textarea {
      height: 400rpx;
      width: 100%;
    }
    .popup-content-count {
      @include flex(flex-end);
      font-size: 24rpx;
      color: $c-9;
    }
  }
}
</style>