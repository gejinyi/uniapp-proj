<template>
		<swiper @change="handleChange" class="article-container" :current="activeIndex">
			<swiper-item v-for="(item,index) in lableList" :key="item._id">
				<view class="swiper-item">
					<ListItem   :loadData='loadData[index]' :articleList = 'articleData[index]' @loadMore='loadMoreData'/>
				</view>
				
			</swiper-item>
		</swiper>
</template>

<script>
	export default {
		name:"ArticleList",
		props:{
			lableList:Array,
			activeIndex:Number
		},
		
		data() {
			return {
				articleData:{},
				loadData:{},
				pageSize:6
			};
		},
		watch:{
			lableList(newValue,oldValue){
				if(JSON.stringify(newValue) === JSON.stringify(oldValue)) return
				this.articleData = {};
				this.loadData = {};
				this.getArcData(this.activeIndex)
			}
		},
		methods:{

			handleChange(e){
				const {current}  = e.detail;
				this.$emit('change',current);
				if(!this.articleData[current] || !this.articleData[current].length) {
					this.getArcData(current)
				}
			},
			async getArcData(index){
				if(!this.loadData[index]){
					this.loadData[index] = {
						page:1,
						total:0,
						loading:'loading'
					}
				}
				const {articleList,total} = await this.$http.getArticleData({
					classify:this.lableList[index].name,
					page:this.loadData[index].page,
					pageSize:this.pageSize
					});
				let tem = this.articleData[index] || [];
				tem.push(...articleList)
				this.$set(this.articleData,index,tem)
				this.loadData[index].total = total;
			},
			loadMoreData(){
				if (this.loadData[this.activeIndex].total == this.articleData[this.activeIndex].length) {
					this.loadData[this.activeIndex] = {
						...this.loadData[this.activeIndex],
						loading:'noMore',
					}
					this.$forceUpdate()
				}else{
					this.loadData[this.activeIndex].page++;
					this.getArcData(this.activeIndex)
				}
				
			}
		},
		created(){
			this.lableList.length && this.getArcData(this.activeIndex)
		}
	}
</script>

<style lang="scss">
.article-container{
	width: 100%;
}
.swiper-item{
	width: 100%;
	height: 100%;
}
</style>