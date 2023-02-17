'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
		const {article_id} = event;
		await db.collection('article').update({
			browse_count:dbCmd.inc(1)
		})
	const collection =await db.collection('article').aggregate().match({
		_id:article_id
	}).project({
		comments:0
	}).end()
		
		return {
			code:0,
			msg:"文章内容获取成功",
			data:collection.data[0],
		}
};

