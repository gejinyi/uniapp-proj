export default {
	userInfo:uni.getStorageSync('userInfo') || null,
	historyList:uni.getStorageSync('historyList') || [],
	lableList:uni.getStorageSync('lableList') || [],
}
