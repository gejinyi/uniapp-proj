'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const version = await db.collection('version').get()
	
	//返回数据给客户端
	return {
		code:0,
		msg:'版本信息获取成功',
		data:{
			version:version.data[0].current_version,
			downLoadLinkUrl:""
		}
	}
};
