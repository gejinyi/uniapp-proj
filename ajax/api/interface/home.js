// 首页的请求文件
import ajax from '../../http.js'

export const getLabelList = (data) => ajax({
	name:'getData',
	data
})
//获取文章列表
export const getArticleData = (data) => ajax({
	name:'getArticleData',
	data
})

// 添加或者取消收藏
	
export const updateSaveLick = (data)=> ajax({
	name:'updateSaveLick',
	data
})

//获取搜索列表
export const getSearchValue = (data)=> ajax({
	name:'getSearchValue',
	data
})

//更新标签
export const updateLabel = (data)=> ajax({
	name:'updateLabel',
	data
})

//获取文章详情内容
export const getArcDetail = (data)=> ajax({
	name:'getArcDetail',
	data
})

//提交评论
export const updateComment = (data)=> ajax({
	name:'updateComment',
	data
})

//获取评论列表
export const getCommentList = (data)=> ajax({
	name:'getCommentList',
	data
})