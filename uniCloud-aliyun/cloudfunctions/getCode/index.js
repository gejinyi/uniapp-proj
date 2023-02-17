'use strict';
exports.main = async (event, context) => {
	let {phone} = event;
	//生成一个随机验证码  截取6位
	
	const number = Math.random().toString().substring(2,6)
	try {
	    const res = await uniCloud.sendSms({
	      appid: '__UNI__C82B82D',//工程id
	      smsKey: '35a68958917b0818d76ea8d1bae50af9',//验证码开发者中心基础配置
	      smsSecret: '3c7e0b07bfccee8b7bda04c3b32ec2ec',
	      phone,
	      templateId: '15138', // 短信模板id
	      data: {
	        code: number,
	        expMinute: '1',
	      }
	    })
	    // 调用成功，请注意这时不代表发送成功
	    return {
			code:0,
			data:{
				msg:'验证码已发送',
				mobileCode:number
			}
		}
	  } catch(err) {
	    // 调用失败
		console.log(err)
	    return {
	      code: 1,
	      msg: '验证码发送失败'
	    }
	  }
	

};
