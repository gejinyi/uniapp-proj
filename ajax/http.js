	
export default ({name,data={}}) =>{
	// name是使用的云函数的名称,data是要传递的数据
	return new Promise((resolve,reject)=>{
		const loading = data.isLoading;
		loading && delete data.isLoading
		!loading && uni.showLoading({})
		
					//设置等待状态
		uniCloud.callFunction({
			name,
			data,//指定一个数据
			success({result}){
				//解构出result
				if (result.code == 0) {
					//请求成功
					resolve(result.data)
				}else{
					uni.showToast({
						//提示框
						icon:'none',
						title:result.msg
					})
				}
			},
			fail(err){
				//失败的回调函数
				reject(err)
			},
			complete(){
				//结束的回调函数
				uni.hideLoading()//结束加载状态
			},
			// extensions
		})
	})
}