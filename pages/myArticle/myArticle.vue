<template>
	<view>
		<ListCard :item="item" v-for="item in articleList" :key="item._id"></ListCard>
		 <view v-if="articledataNone"  class="no-data">暂无发布的文章</view>
	</view>
</template>

<script>
	export default {
		onLoad(){
			this.getMyArticle()
		},
		data() {
			return {
				articleList:[],
				articledataNone:false
			}
		},
		methods: {
			async getMyArticle(){
				const list = await this.$http.getMyArticle({
					userId:this.userInfo._id
				})
				this.articledataNone = !list.length;
				this.articleList = list
			}
		}
	}
</script>

<style lang="scss">
 .no-data {
        height: 400rpx;
        line-height: 400rpx;
        width: 100%;
        text-align: center;
        font-size: 24rpx;
        color: #666;
    }
</style>
