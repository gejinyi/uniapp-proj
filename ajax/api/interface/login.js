// 用户登录
import ajax from '../../http.js'

export const userInfo = (data) => ajax({
	name:'userInfo',
	data
})

//发送验证码

export const getCode = (data) => ajax({
	name:'getCode',
	data,
	extensions: {
			"uni-cloud-sms": {} // 启用uni-cloud-sms扩展，值为空对象即可
		}
})

// 关注作者

export const updateLikeAuthor = (data) => ajax({
	name:'updateLikeAuthor',
	data
})

//点赞
export const updateCompoliments = (data) => ajax({
	name:'updateCompoliments',
	data
})

//关注文章列表
export const get_follow_article = (data) => ajax({
	name:'get_follow_article',
	data
})

//关注作者列表
export const get_follow_Author = (data) => ajax({
	name:'get_follow_Author',
	data
})

//版本
export const get_current_version = (data) => ajax({
	name:'get_current_version',
	data
})

//我的文章
export const getMyArticle = (data) => ajax({
	name:'getMyArticle',
	data
})

//更新反馈
export const updateFeeBack = (data) => ajax({
	name:'updateFeeBack',
	data
})

//更新头像
export const updataUserAvatar = (data) => ajax({
	name:'updataUserAvatar',
	data
})


