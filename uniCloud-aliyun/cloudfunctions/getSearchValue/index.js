'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
		const {searchVal} = event;
		
	const collection =await db.collection('article').aggregate().match({
		title:new RegExp(searchVal)
	}).project({
			content:0 
		}).end()
		
		return {
			code:0,
			msg:"数据请求成功",
			data:{
				articleList:collection.data,
			}
		}
};

