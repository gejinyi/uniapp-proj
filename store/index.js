import Vue from 'vue'
import VueX from 'vuex'
import state from './state.js'
import mutations from './mutation.js'
import actions from './action.js'
Vue.use(VueX)
export default new VueX.Store({
	state,
	mutations,
	actions
})