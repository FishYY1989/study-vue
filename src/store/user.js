export default {
    namespaced: true, //设置独立的命名空间，避免命名冲突
    state: {
        isLogin: false
    },
    mutations: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        }
    },
    actions: {
        //参数1是vuex传递的上下文context:{commit, dispatch, state}
        login({ commit }, username) {
            //模拟登录api调用，1s以后如果用户名是admin则登录成功
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin') {
                        commit('login')
                        resolve()
                    } else {
                        reject()
                    }
                }, 1000)
            })
        }
    },
}