<template>
	<view class="home-container">
		<NavBar />
		<TabBar @changeContent='handleContentChange' :activeIndex='activeIndex' :lableList='lableList' />
		<ArticleList @change = 'handleChange' :activeIndex='activeIndex' :lableList='lableList' class='list-container' />
	</view>

</template>

<script>
	import { mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				activeIndex:0
			}
		},
		onLoad() {
			this.getLable () 
		},
		methods: {
			async getLable(){
				if (this.lableList.length) return
				const lable_List = await this.$http.getLabelList();
				this.setLableList([{name:'全部'},...lable_List])
			},
			handleContentChange (i) {
				this.activeIndex = i;
			},
			handleChange(current){
				this.activeIndex = current;
			},
			...mapMutations(['setLableList'])
		},
		computed:{
			lableList(){
				if (this.userInfo) {
					//如果用户已经登录
				        this.activeIndex = 0;
				        return [...this.$store.state.lableList.slice(0,1),...this.$store.state.lableList.filter(item => this.userInfo.label_Ids.includes(item._id))]
				      } else {
				        return this.$store.state.lableList
				      }
			}
		}
	}
</script>

<style lang="scss">
	page{
		display: flex;
		height: 100%;
	}
	.home-container{
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		align-items: inherit;
		@include flex(flex-start,column)
	}
	.list-container{
		flex: 1;
		box-sizing: border-box;
		height: 100%;
	}
	
</style>
