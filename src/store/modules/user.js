// import API from '@/api/api_list'
// import axios from "axios";
import { getInfo } from '@/api/user'
import { login, logout, register,resetPassword } from '@/api/auth'
import { saveUser, setPassword } from '@/api/user'
import {
    getToken,
    setToken,
    removeToken,
    setUserInfo,
} from '@/utils/auth'
import md5 from "js-md5";



const state = () => ({
    name: 'null',
    email: '',
    avatar: '',
    leave: '',
    token: getToken(),
    credits: 0
})
// mutations
const mutations = {
    // UPDATE_STATE(state, data) {
    //     console.log("更新用户数据")
    //     Object.assign(state, data)
    // },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_LEAVE: (state, leave) => {
        state.leave = leave
    },
    SET_CREDITS: (state, credits) => {
        state.credits = credits
    }
}
// getters
const getters = {
    name: (state) => state.name,
    email: (state) => state.email,
    avatar: (state) => state.avatar,
    leave: (state) => state.leave,
    token: (state) => state.token,
    credits: (state) => state.credits,
}

// actions
const actions = {
    // 登录
    Login({ dispatch }, formdata) {
        const email = formdata.email.trim()
        const password = md5(formdata.password)
        return new Promise((resolve, reject) => {
            login(email, password).then( data=> {
                dispatch('SetUserData', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 注册
    Register(context, formdata) {
        const email = formdata.email.trim().toLowerCase()
        const username = formdata.username.trim()
        return new Promise((resolve, reject) => {
            register(email, username, formdata.password).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    //重置密码
    ResetPassword(context, formdata) {
        const email = formdata.email.trim()
        const password = formdata.password
        return new Promise((resolve) => {
            resetPassword(email, password).then(()=> {
                resolve()
            })
        })
    },
    // 获取用户信息
    GetInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(data => {
                console.log(data)
                commit('SET_TOKEN', getToken())
                commit('SET_NAME', data.name)
                commit('SET_EMAIL', data.email)
                commit('SET_AVATAR', data.avatar)
                commit('SET_LEAVE', data.leave)
                commit('SET_CREDITS', data.credits)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    SaveUser({ commit }, formData) {
        return new Promise((resolve, reject) => {
            const email = formData.email.trim()
            const username = formData.username.trim()
            saveUser({ username, email }).then((data) => {
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    SetPassword(Content, formData) {
        return new Promise((resolve, reject) => {
            let { oldpwd, newpwd } = formData
            setPassword({ oldpwd, newpwd }).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 登出
    LogOut({ dispatch, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                dispatch('InitializationUserInfo')
                removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 前端 登出
    FedLogOut({ dispatch }) {
        return new Promise(resolve => {
            dispatch('InitializationUserInfo')
            resolve()
        })
    },
    // 设置用户数据
    SetUserData({ commit }, data) {
        setToken(data.token)
        setUserInfo(data)
        commit('SET_NAME', data.name)
        commit('SET_EMAIL', data.email)
        commit('SET_TOKEN', data.token)
        commit('SET_AVATAR', data.avatar)
        commit('SET_LEAVE', data.leave)
        commit('SET_CREDITS', data.credits)
    },
    //初始化信息
    InitializationUserInfo({ commit }) {
        commit('SET_TOKEN', '')
        setToken('')
        removeToken()
    }
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}