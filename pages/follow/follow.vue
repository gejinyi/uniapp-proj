<template>
  <view class="follow-container">
    <view class="follow-tab">
      <view class="follow-tab-box">
        <view class="follow-tab-item" :class="{active:currentIndex===0}" @click="currentIndex = 0">文章</view>
        <view class="follow-tab-item" :class="{active:currentIndex===1}" @click="currentIndex = 1">作者</view>
      </view>
    </view>
    <!-- 内容切换区域 -->
    <view class="follow-list-container">
      <swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex = $event.detail.current">
        <swiper-item :class="{
			'no-data':ArcdataNone
		}">
			{{ArcdataNone && "暂无收藏的文章"}}
          <ListItem :isShowLoading="isShowLoading" :articleList="articleList" v-if="articleList.length"></ListItem>
          <!-- <view v-if="ArcdataNone"  class="no-data">暂无收藏的文章</view> -->
        </swiper-item>
        <swiper-item :class="{
			'no-data':AuthordataNone
		}">
			{{AuthordataNone && "暂无关注的作者"}}
          <AuthorList :authorList ='authorList'></AuthorList>
		   <!-- <view v-if="AuthordataNone"  class="no-data">暂无关注的作者</view> -->
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  onLoad () {
    // #ifdef MP-WEIXIN
    if (!this.$store.state.userInfo) {
      uni.redirectTo({
        url: '/pages/userInfo/login/login'
      })
      return
    }
    // #endif
	uni.$on('updateArticle',(e)=>{
		    this._getFollowArticle('noLoading')
	})
	uni.$on('updateAuthorList',(e)=>{
		    this._getFollowAuthor('noLoading')
	})
    this._getFollowArticle()
	this._getFollowAuthor()
  },
  data () {
    return {
      currentIndex: 0,
      articleList: [],
	   authorList: [],
      isShowLoading: false,
      ArcdataNone:'',
	   AuthordataNone:''
    }
  },
  methods: {
    async _getFollowArticle (isLoading) {
      const list = await this.$http.get_follow_article({ userId: this.userInfo._id,isLoading })
      this.articleList = list
      if(!list.length){
		  this.ArcdataNone = true
	  }else{
		  this.ArcdataNone = ''
	  }
    },
	async _getFollowAuthor(isLoading){
		const list = await this.$http.get_follow_Author({ userId: this.userInfo._id,isLoading })
		this.authorList = list
		!list.length && (this.AuthordataNone = true)
	}
  }
}
</script>

<style lang="scss">
page {
    height: 100%;
    display: flex;
}

.follow-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    box-sizing: border-box;
    .follow-tab {
        height: 100rpx;
        padding: 0 40rpx;
        border-bottom: 1px solid #f5f5f5;
        @include flex(center);
        box-sizing: content-box;
        .follow-tab-box {
            height: 60rpx;
            display: flex;
            width: 100%;
            border-radius: 10rpx;
            border: 1px solid $base-color;
            .follow-tab-item {
                @include flex(center);
                color: #666;
                font-size: 28rpx;
                flex-grow: 1;
                &:first-child {
                    border-right: 1px solid $base-color;
                }
                &.active {
                    color: $base-color;
                }
            }
        }
    }
    .follow-list-container {
        flex: 1;
        /* 第二次添加样式 */
        .follow-list-swiper {
            height: 100%;
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
}
</style>
