<template>
	<view class="save-likes-icon" @click.stop="changeSaveStuta">
		<uni-icons :type="isLike ? 'heart-filled': 'heart'" color="#ff6600" size="20"></uni-icons>
		
	</view>
</template>

<script>
	export default {
		name:"SaveLikes",
		data() {
			return {
				
			};
		},
		props:{
			item: {
				type:Object,
				default:function(){
					return {}
					//设置默认值为空对象，防止初始化时没有值而报错
				}
			}
		},
		methods:{
			async changeSaveStuta(){
				//判断是否登录  登录成功才执行以下函数
				await this.checkLogin()
				const { msg, newUserInfo }= await this.$http.updateSaveLick({
					articleId:this.item._id,
					userId:this.userInfo._id
				})
				
				uni.showToast({
					title:msg,
					icon:"none"
				})
				this.updateUserInfo({
					...this.userInfo,
					...newUserInfo
				})
				uni.$emit('updateArticle')
			}
		},
		computed:{
			isLike(){
				// 先登录才能收藏
				try{
					return this.userInfo&&this.userInfo.article_likes_ids.includes(this.item._id)
				}catch(e){
					return false
				}
				
			}
		}
	}
</script>

<style>

</style>