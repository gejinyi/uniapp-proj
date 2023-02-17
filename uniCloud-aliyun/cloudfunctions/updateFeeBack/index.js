'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {content,userId,feedBackList} =  event;
	await db.collection('feedback').add({
		user_id:userId,
		feedBackList,
		content
	})
	
	//返回数据给客户端
	return {
		coded:0,
		msg:"反馈成功"
	}
};
