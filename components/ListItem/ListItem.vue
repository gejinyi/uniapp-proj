<template>
	<view class="list-item-container">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="loadMore">
			<view>
				<ListCard @saveHistory='saveHistory' :item ='item' v-for="(item,i) in articleList" :key="item._id"/>
			</view>
			<uni-load-more v-if="isShowLoading && articleList && articleList.length == 0 ||articleList && articleList.length > 7" :status="loadData.loading"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"ListItem",
		props:{
			articleList:{
				type:Array
			},
			isShowLoading:{
				type:Boolean,
				default:true,
			},
			loadData:{
				type:Object,
				default(){
					return {
						loading:'loading'
					}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			loadMore(){
				this.$emit('loadMore')
			},
			saveHistory(){
				this.$emit('saveHistory')
			}
		},
	}
</script>

<style lang="scss">
.list-item-container{
	height: 100%;
	.list-scroll{
		box-sizing: border-box;
		height: 100%;
		overflow: hidden;
	}
}
</style>