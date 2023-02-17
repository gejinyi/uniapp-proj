<template>
  <view class="search-container">
    <!-- 搜索导航组件 -->
    <NavBar @sendSearchValue='sendSearchValue' :isSearch="isSearch" :parentValue='value' @updateVal='value = $event'></NavBar>
    <!-- 搜索包裹 -->
    <view v-if="isShowHistory" class="search-wrapper">
      <!-- 没有进行搜索的操作 -->
      <view  class="search-history-container">
        <!-- 头部 -->
        <view class="search-header">
          <text class="history-text">搜索历史</text>
          <text class="history-clean" @click="clearHistory">清空</text>
        </view>
        <!-- 内容部分 -->
        <view class="search-history-content" v-if="historyList.length > 0">
          <view @click="openHistory(item)" class="history-content-item" v-for="(item,i) in historyList" :key="i">{{item}}</view>
        </view>

        <view v-else class="no-data">当前没有搜索历史</view>
      </view>
    </view>
	<!-- 开始进行搜索的操作 -->
	<view v-else class="search-list-container">
	  <ListItem @saveHistory='saveHistory' :isShowLoading='false' :articleList='searchList' v-if="searchList.length"></ListItem>
	   <view v-else class="no-data">没有搜索到相关数据</view>
	</view>
  </view>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  data () {
    return {
      isSearch: true,
      searchList:[],
	  value:'',
	  isShowHistory:true
    }
  },
  methods: {
	async sendSearchValue(){
		if(!this.value) {
			this.isShowHistory = true;
			this.searchList = [];//没有输入搜索内容就不返回数据
			return
		}
		this.isShowHistory = false;
		const {articleList} = await this.$http.getSearchValue({
			searchVal:this.value
		})
		this.searchList = articleList;
	},
	saveHistory(){
		this.setHistory(this.value)
	},
	...mapMutations(['setHistory','clearHistory']),
	openHistory(val){
		this.value = val;
		this.sendSearchValue()
	},
  },
  computed:{
	  ...mapState(['historyList'])
  }
}
</script>

<style lang="scss">
page {
    background-color: #f5f5f5;
    height: 100%;
    display: flex;
}

.search-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    .search-wrapper {
        background-color: #ffffff;
        margin-bottom: 20rpx;
        .search-header {
            @include flex();
            font-size: 28rpx;
            color: #666666;
            padding: 20rpx 30rpx;
            border-bottom: 1px solid #f5f5f5;
            .history-text {
                color: $base-color;
            }
            .history-clean {
                color: #30b33a;
                font-weight: bold;
            }
        }
        .search-history-content {
            @include flex(flex-start, row, wrap);
            padding: 30rpx;
            padding-top: 0;
            .history-content-item {
                padding: 4rpx 20rpx;
                margin-top: 24rpx;
                margin-right: 20rpx;
                border-radius: 10rpx;
                border: 1px solid #666;
                font-size: 28rpx;
                color: #666;
            }
        }

    }
	.no-data {
	    height: 400rpx;
	    line-height: 400rpx;
	    width: 100%;
	    text-align: center;
	    font-size: 24rpx;
	    color: #666;
	}
	.search-list-container{
		flex: 1;
		height: 100%;
		overflow: hidden;
	}
}
</style>
