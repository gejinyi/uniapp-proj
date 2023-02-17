'use strict';
const db = uniCloud.database()
//定义修改指令
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {userId,articleId} = event;
	const userInfo =await db.collection('user').doc(userId).get();
	const articelIds = userInfo.data[0].article_likes_ids;
	let newarr = null;
	let msg = '';
	//判断是否收藏了文章
	if(articelIds.includes(articleId)){
		// 包含，则删除
		newarr = dbCmd.pull(articleId);
		msg = '取消收藏'
	}else{
		// 添加
		newarr = dbCmd.addToSet(articleId)
		msg = '收藏成功'
	}
	//替换
	await  db.collection('user').doc(userId).update({
		article_likes_ids:newarr
	})
	const newusers = await db.collection('user').doc(userId).get();
	return {
		code:0,
		data:{
			msg,
			newUserInfo:newusers.data[0]
		}
	}
};
