<template>
	<view>
		<view class="feedback-title">
			意见反馈：
		</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
		</view>

		<view class="feedback-title">
			反馈图片：
		</view>

		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
				<view class="close-icon" @click="delImage(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 添加图片的icon -->
			<view v-if="imageList.length < 5" class="feedback-image-item" @click="_addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>

		<button type="warn" class="feedback-button" @click="_submitFeedback">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageList: []
			}
		},
		methods: {
			// 添加图片
			async _addImage() {
				const count = 5 - this.imageList.length;
				uni.chooseImage({
					count,
					success:(res)=>{
						//拿到图片信息数组
						const tempFilePaths = res.tempFilePaths;
						tempFilePaths.forEach((url,i)=>{
							if(i < count){
								this.imageList.push({
									url,
									name:res.tempFiles[i].name
								})
							}
						})
					}
				})
			},
			// 发送意见反馈的内容
			async _submitFeedback() {
				if(!this.content){
					uni.showToast({
						title:'反馈内容不能为空',
						icon:"none"
					})
					return
				}
				//上传图片
				uni.showLoading()
				const feedBackList = await Promise.all(this.getFiledId())
				uni.hideLoading()
				setTimeout(()=>{
					console.log(1)
					uni.switchTab({
						url:'/pages/self/self'
					})
				},1500)
				//提交反馈信息
				const {msg} = await this.$http.updateFeeBack({
					content:this.content,
					userId:this.userInfo._id,
					feedBackList
				})

				uni.showToast({
					title:msg
				})

			},
			//删除图片
			delImage(index){
				this.imageList.splice(index,1)
			},
			getFiledId(){
				return this.imageList.map(item =>{
					return new Promise(async resolve =>{
						const result = await uniCloud.uploadFile({
							filePath:item.url,
							cloudPath:item.name
						})
						resolve(result.fileID)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		margin: 30rpx;
		margin-bottom: 0;
		font-size: 28rpx;
		color: #666;
	}
	
	.feedback-content {
		margin: 30rpx;
		padding: 20rpx;
		box-sizing: border-box;
		border: 1px solid #eee;
		.feedback-textarea {
			font-size: 24rpx;
			width: 100%;
			height: 200rpx;
		}
	}
	
	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;
		.feedback-image-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;
			.close-icon {
					position: absolute;
					right: 0;
					top: 0;
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					z-index: 2;
					background-color: $base-color;
					@include flex(center);
			}
			.image-box {
				@include flex(center);
				top: 10rpx;
				right: 10rpx;
				position: absolute;
				left: 10rpx;
				bottom: 10rpx;
				border: 1px solid #eee;
				border-radius: 10rpx;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.feedback-button {
		margin: 0 30rpx;
		background-color: $base-color;
	}
	
	

</style>
