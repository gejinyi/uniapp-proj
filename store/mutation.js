export default {
	updateUserInfo (state,userInfo) {
		uni.setStorageSync('userInfo',userInfo)
		state.userInfo = userInfo
	},
	//设置搜索历史记录
	setHistory (state,value) {
		let arr= state.historyList;
		if(arr && arr.includes(value)){
			return
		}
		arr.unshift(value)
		uni.setStorageSync('historyList',arr)
		state.historyList = arr
	},
	//清空历史记录
	clearHistory (state,value) {
		uni.removeStorageSync('historyList')
		state.historyList = [];
	},
	//设置导航标签列表
	setLableList(state,lableList){
		uni.setStorageSync('lableList',lableList)
		state.lableList = lableList
	},
}