'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数  
	const {userId,articleId} = event;
	const  user = await db.collection('user').doc(userId).get();
	const upIds = user.data[0].thumbs_up_article_ids;
	let returnMsg = '';
	let article_Id = null;
	let thumbsNum = null;
	if(upIds.includes(articleId)){
		returnMsg = '取消点赞';
		article_Id = dbCmd.pull(articleId)
		thumbsNum = -1;
	}else{
		returnMsg = '点赞成功';
		article_Id = dbCmd.addToSet(articleId)
		thumbsNum = 1
	}
	
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids:article_Id
	})
	//点赞数处理 
	await db.collection('article').doc(articleId).update({
		thumbs_up_count:dbCmd.inc(thumbsNum)
	})
	return {
		code:0,
		data:{
			msg:returnMsg,
		}
	}
};

