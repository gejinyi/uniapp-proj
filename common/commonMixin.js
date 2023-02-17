import {
	mapState,
	mapMutations
} from 'vuex'

export default{
	install(Vue){
		Vue.mixin({
			data(){
				return{
					
				}
			},
			methods:{
				checkLogin(){
					return new Promise((resolve)=>{
						if (this.userInfo){
							//已经成功登录
							resolve()
						}else{
							uni.navigateTo({
								
								//如果没有登录
								url:'../../pages/userInfo/login/login'
							})
						}
					})
				},
				...mapMutations(['updateUserInfo'])
			},
			computed:{
				...mapState(['userInfo'])
			}
		})
	}
}