const requireApi = require.context('.',true,/.js$/);
const module = {};
requireApi.keys().forEach((item)=>{
	if (item == './index.js') {
		return
	}
	Object.assign(module,requireApi(item))
})
export default module