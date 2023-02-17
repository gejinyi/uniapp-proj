<template>
  <view class="label-container">
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">我的标签</view>
        <view class="label-edit" @click="startEdit">{{this.isEdit? '完成' :'编辑'}}</view>
      </view>
      <view class="label-content">
        <view class="label-content-item" v-for="(item,index) in selfLableList" :key="index">
          {{item.name}}
          <uni-icons @click="deleteLabelItem(item)" v-if="isEdit" class="icon-close" type="clear" size="20" color="red"></uni-icons>
        </view>
        <view v-if="!selfLableList.length" class="no-data">当前没有数据</view>
      </view>
    </view>
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">标签推荐</view>
      </view>
      <view class="label-content">
        <view class="label-content-item" @click="changeselfLableList(item)" v-for="(item,index) in commendLableList" :key="index">
           {{item.name}}
        </view>
        <view v-if="!commendLableList.length" class="no-data">当前没有数据</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState,mapMutations} from 'vuex'
export default {
  data () {
    return {
      isEdit: false,
	  labelids:[]
    }
  },
  watch:{
	  userInfo:{
		  immediate:true,
		  handler(newVal,oldVal){
			 this.labelids = [...this.userInfo.label_Ids]
		  }
	  }
  },
  methods: {
    // 编辑按钮事件
    startEdit () {
      this.isEdit && this.updateLabel();
      this.isEdit = !this.isEdit;
    },
    // 修改标签
    async updateLabel() {
		const label_Ids = this.selfLableList.map(item => item._id)
		const {msg} = await this.$http.updateLabel({
			userId: this.userInfo._id,
			label_Ids,
		})
		uni.showToast({
			title:msg,
		})
		this.updateUserInfo({
			...this.userInfo,
			label_Ids,
		})
    },
	    deleteLabelItem (item) {
	      this.labelids = this.labelids.filter(id => id !== item._id)
	    },
	changeselfLableList(item){
		if(!this.isEdit) return
		this.labelids.push(item._id)
	}
  },
  computed:{
	  ...mapState(['lableList']),
	  selfLableList(){
		  return this.lableList.filter(item => this.labelids.includes(item._id))
	  },
	  commendLableList(){
	  		  return this.lableList.filter(item =>!this.labelids.includes(item._id) && item._id)
	  },
  }
}
</script>

<style lang="scss">
@import "./labelAdmin.scss";
</style>
