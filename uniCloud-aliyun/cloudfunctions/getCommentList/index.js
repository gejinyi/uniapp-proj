'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
		const {articleId,page = 1,pageSize = 10} = event;
		const list = await db.collection('article').aggregate().match({
			_id:articleId
		}).unwind("$comments").project({
			_id:0,
			comments:1
		}).replaceRoot({
			newRoot:"$comments"
		}).skip(pageSize * (page - 1) ).limit(pageSize).end();
		return {
			code:0,
			msg:"获取评论成功",
			data:list.data
		}
};


