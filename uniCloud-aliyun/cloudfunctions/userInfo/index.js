'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数  
	const {loginName,password,phone,type} = event;
	const  {affectedDocs,data} =await db.collection('user').aggregate().match(type === 'account' ? { loginName, password } : { phone }).end()
	//登录成功和失败的处理
	return affectedDocs ? {
		code:0,
		msg:'获取用户信息成功',
		data:data[0]
	}:{
		code:1,
		msg:type == 'account' ? '获取用户信息失败，请检查用户名和密码':'获取用户信息失败，请检查验证码和手机号'
	}
};
