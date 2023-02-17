<template>
  <view>
    <!-- 当用户为登录状态时进行显示 -->
    <view v-if="userInfo" class="my-header">
      <view class="my-header-background">
        <image :src="userInfo.avatar" mode="aspectFill"></image>
      </view>
      <view class="my-header-logo" @click="changeAvatar">
        <view class="my-header-logo-box">
          <image :src="userInfo.avatar" mode="aspectFill"></image>
        </view>
        <text class="user-name">{{userInfo.author_name}}</text>
      </view>
      <view class="my-header-info">
        <view class="my-header-info-box">
          <text class="my-header-info-title">被关注</text>
          <text>{{userInfo.follow_count}}</text>
        </view>
        <view class="my-header-info-box">
          <text class="my-header-info-title">粉丝</text>
          <text>{{userInfo.fans_count}}</text>
        </view>
        <view class="my-header-info-box">
          <text class="my-header-info-title">积分</text>
          <text>{{userInfo.integral_count ? userInfo.integral_count : 0}}</text>
        </view>
      </view>
    </view>

    <view class="my-content">
      <view v-if="!userInfo" class="my-content-list" @click="goLoginPage">
        <view class="my-content-list-title">
          <image class="company-logo" src="../../static/img/logo.jpeg" mode="aspectFill"></image>
          <text>HI，您尚未登录,请点击登录</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
      <view class="my-content-list" @click="goMyArticle">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
          <text>我的文章</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
      <view class="my-content-list" @click="goFeedBack">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
          <text>意见反馈</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>

      <!-- #ifdef APP-PLUS -->
      <view class="my-content-list">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="paperclip" size="16" color="#666"></uni-icons>
          <view class="version-container">
            <text>
              当前版本
              <text v-if="haveNewVersion" class="new-version-tip">(点击下载最新版本)</text>
            </text>
            <text class="version">{{currentVersion}}</text>
          </view>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
      <!-- #endif -->
      <button v-if="userInfo" type="warn" class="sign-out" @click="siginOut">退出</button>
    </view>

  </view>
</template>

<script>
export default {
	onLoad(){
		uni.getSystemInfo({
			      success: (res) => {
			        if (res.platform == "android") {
			          plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
			            this.currentVersion = wgitinfo;
			            this._checkVersion();
			          })
			        }
			      }
		})
	},
  data () {
    return {
      currentVersion: '1.0.0',
      haveNewVersion: false
    }
  },
  methods: {
    // 跳转到登录界面
    goLoginPage () {
      uni.navigateTo({
        url: '/pages/userInfo/login/login'
      })
    },
    // 退出登录
    siginOut () {
      this.$store.commit('updateUserInfo', null)
      uni.navigateTo({
        url: '/pages/index/index'
      })
    },
	async _checkVersion(){
		 const {version,downLoadLinkUrl} = await this.$http.get_current_version();
		      if(version > this.currentVersion) {
		        this.haveNewVersion = true;
		        this.downLoadLinkUrl = downLoadLinkUrl
		      }
	},
	 _getNewVersion() {
	      uni.showLoading({title:'下载中，请稍后'});
	       var dtask = plus.downloader.createDownload(this.downLoadLinkUrl, {}, function (d, status) {
	        // 下载完成  
	        uni.hideLoading({})
	        if (status == 200) {
	          plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function (error) {
	            uni.showToast({
	              title: '安装失败',
	              duration: 1500,
	              icon: 'none'
	            });
	          })
	        } else {
	          uni.showToast({
	            title: '更新失败',
	            duration: 1500,
	            icon: 'none'
	          });
	        }
	      });
	      dtask.start();
	    },
		goMyArticle(){
			uni.navigateTo({
				url:'pages/myArticle/myArticle'
			})
		},
		goFeedBack(){
			uni.navigateTo({
				url:'pages/feedBack/feedBack'
			})
		},
		changeAvatar(){
			uni.chooseImage({
				count:1,
				success:async res =>{
						const filePath = await this.updataFile(res.tempFilePaths[0],res.tempFiles[0].name || Date.now().toString() + res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.')))
						await this.updataUserAvatar(filePath)
					}
			})
			
		},
		//上传图片
		async updataFile(filePath,cloudPath){
			const {fileID} = await uniCloud.uploadFile({
				filePath,
				cloudPath
			})
			return fileID
		},
		//修改用户信息
		async updataUserAvatar(filePath){
			const { msg }  = await this.$http.updataUserAvatar({
				filePath,
				userId:this.userInfo._id
			})
			uni.showToast({
				title:msg,
				icon:'none'
			})
			this.updateUserInfo({
				...this.userInfo,
				avatar:filePath
			})
		}
  }
}
</script>

<style lang="scss">
page {
    background-color: #f5f5f5;
}

.my-header {
    position: relative;
    padding-bottom: 30rpx;
    .my-header-background {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        opacity: .3;
        filter: blur(16rpx);
        image {
            width: 100%;
            height: 100%;
        }
    }
    .my-header-logo {
        @include flex(flex-start, column);
        align-items: center;
        padding-top: 60rpx;
        position: relative;
        z-index: 10;
        .my-header-logo-box {
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            overflow: hidden;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .user-name {
            margin-top: 30rpx;
            font-size: 32rpx;
            font-weight: bold;
        }
    }
    .my-header-info {
        margin-top: 30rpx;
        @include flex();
        .my-header-info-box {
            width: 100%;
            @include flex(space-between, column);
            font-size: 24rpx;
            color: #999;
            .my-header-info-title {
                font-size: 28rpx;
                color: #333;
            }
        }
    }
}

.my-content {
    .my-content-list {
        @include flex();
        padding: 30rpx;
        margin-bottom: 20rpx;
        background-color: #ffffff;
        color: #333;
        font-size: 28rpx;
        .my-content-list-title {
            display: flex;
            align-items: center;
            flex-grow: 1;
            .icons {
                margin-right: 10rpx;
            }
            /*版本样式 */
            .version-container {
                @include flex();
                flex-grow: 1;
                .version {
                    margin-right: 40rpx;
                    color: #888;
                    font-weight: bold;
                }
                .new-version-tip {
                    font-size: 20rpx;
                    color: $base-color;
                }
            }
        }
    }
    .sign-out {
        margin: 120rpx 20rpx 0;
    }
    // 用户未登录状态
    .company-logo {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 40rpx;
    }
}
</style>
