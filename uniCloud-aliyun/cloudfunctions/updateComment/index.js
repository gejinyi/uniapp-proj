'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
		const {userId,articleId,content,comment_id='',is_reply = false,reply_id = "",} = event;
		let user =await db.collection('user').doc(userId).get();
		user = user.data[0];
		const article = await db.collection('article').doc(articleId).get();
		const comments = article.data[0].comments;
		function generatedId(num) {
			return Number(Math.random().toString().substring(3,num) + Date.now()).toString(36)
		}
		let commentObj = {
			comment_id: generatedId(5),
			    comment_content: content,
			    create_time: Date.now(),
			    is_reply,
			    author: {
			      author_id: user._id,
			      author_name: user.author_name,
			      avatar: user.avatar,
			      professional: user.professional
			    },
			    replyArr: []
		}
		if(comment_id == ''){
			//扩充评论
			commentObj.replyArr = [];
			commentObj = dbCmd.unshift(commentObj)
		}else{
			let commentAuthor = null;
			// 获取指定的评论内容
			let commentIndex = comments.findIndex(item => item.comment_id === comment_id);
			if(is_reply) {
						commentAuthor = comments[commentIndex].replyArr.find(item => item.comment_id === reply_id).author.author_name
					}else {
						commentAuthor = comments.find(item => item.comment_id === comment_id).author.author_name
					}
			commentObj.to = commentAuthor;
					commentObj = {
						[commentIndex]: {
							replyArr: dbCmd.unshift(commentObj)
						}
					}
		}
		
		 await db.collection('article').doc(articleId).update({
			 comments:commentObj
		 })
		return {
			code:0,
			data:{
				msg:"评论成功",
				data:commentObj
			}
		}
};


