import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },

  //严格模式，防止用户恶意修改
  strict: true
})
