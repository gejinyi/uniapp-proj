'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数  
	const {userId,label_Ids} = event;
	const  res =await db.collection('user').doc(userId).update({
		label_Ids
	})
	return {
		code:0,
		data:{
			msg:'修改标签成功',
		}
	}
};
