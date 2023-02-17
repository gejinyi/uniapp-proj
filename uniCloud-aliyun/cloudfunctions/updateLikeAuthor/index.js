'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数  
	const {authorId,userId,articleId} = event;
	const  user = await db.collection('user').doc(userId).get();
	const authorLikeIds = user.data[0].author_likes_ids;
	let returnMsg = '';
	let authorIds = null;
	if(authorLikeIds.includes(authorId)){
		returnMsg = '取消关注';
		authorIds = dbCmd.pull(authorId)
	}else{
		returnMsg = '关注成功';
		authorIds = dbCmd.addToSet(authorId)
	}
	
	await db.collection('user').doc(userId).update({
		author_likes_ids:authorIds
	})
	return {
		code:0,
		data:{
			msg:returnMsg,
		}
	}
};

