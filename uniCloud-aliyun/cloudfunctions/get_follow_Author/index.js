'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	//event为客户端上传的参数  
	const {userId} = event;
	const  user = await db.collection('user').doc(userId).get();
	const authorLikeIds = user.data[0].author_likes_ids;
	let list = await db.collection('user').aggregate().addFields({
		is_Like:$.in(['$id',authorLikeIds])
	}).project({
		loginName:false,
		password:false
	}).match({
		is_Like:true
	}).end()
	
	return {
		code:0,
		msg:'获取数据成功',
		data:list.data
	}
};

