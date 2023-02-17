'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {filePath,userId} = event;
	const user = await db.collection('user').doc(userId).get();
	const oldImgList = user.data[0].avatar;
		try {
			await uniCloud.deleteFile({
				fileList: [oldImgList],
			});
		}catch(e) {
			console.log(e)
		}
		 
		 await db.collection('user').doc(userId).update({
			avatar:filePath
		})
		const id = user.data[0].id;
		await db.collection('article').where({
			'author.id':id
		}).update({
			'author.avatar':filePath
		})
	
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:'头像修改成功'
		}
	}
};
