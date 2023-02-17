export default {
  install (Vue) {   // uniapp使用install的形式进行安装mixin
    Vue.mixin({
      data () {
        return {
			mobileReg:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          userRules:{
			  loginName:{
				  rules:[{
					  required:true,
					  'errorMessage':'账户名不能为空'
				  },{
					  validateFunction:this.validateLoginName
				  }]
			  },
			 password:{
			 		rules:[{
			 				required:true,
			 				'errorMessage':'密码不能为空'
			 		}]
			 },
			 phone:{
			 				  rules:[{
			 					  required:true,
			 					  'errorMessage':'手机号不能为空'
			 				  },{
			 					  validateFunction:this.validatePhone
			 				  }]
			 },
			 vCode:{
			 				  rules:[{
			 					  required:true,
			 					  'errorMessage':'验证码不能为空'
			 				  },{
			 					  validateFunction:this.validateCode
			 				  }]
			 },
		  }
        }
      },
      methods: {
        async validateLoginName (rule,val,data,callback) {
		switch(true){
			case val.length < 6:
			callback('用户名长度不正确')
			break
			default :
			return true
			}
        },
		async validatePhone(rule,val,data,callback){
			switch(true){
				case !this.mobileReg.test(val) :
				callback('手机号格式不正确')
				break
				default :
				return true
				}
		},
		async validateCode(rule,val,data,callback){
			switch(true){
				case val != this.currentCode:
				callback('验证码错误')
				break
				default :
				return true
				}
		}
      }
    })
  }
}