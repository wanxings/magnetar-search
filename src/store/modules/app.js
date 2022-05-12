import { getConfig } from '@/api/app'
import {
    getLanguage,
    getSearchJavlibrary,
    getSearchJavlibraryTotal,
    getSearchDoubanlibrary,
    getSearchDoubanlibraryTotal,
    getDarkmode,
    getAutotracker,
    getVersion,
    setVersion,
    setLanguage,
    setDarkmode, 
    setSearchJavlibrary,
    setSearchJavlibraryTotal,
    setSearchDoubanlibrary,
    setSearchDoubanlibraryTotal,
    setAutotracker,
} from '@/utils/app'
import {
    logo,
    title,
} from '@/config'
if(!getSearchJavlibrary()) setSearchJavlibrary('on')
if(!setSearchDoubanlibrary()) setSearchDoubanlibrary('on')
const state = () => ({
    logo,
    title,
    // notic: '',
    searchRankingData: [],
    polyStatusData: [],
    trackerList: '',
    version: getVersion() || null,
    searchJavlibrary: getSearchJavlibrary() || 'on',
    searchJavlibraryTotal: getSearchJavlibraryTotal() || 3,
    searchDoubanlibrary: getSearchDoubanlibrary() || 'on',
    searchDoubanlibraryTotal: getSearchDoubanlibraryTotal() || 3,
    language: getLanguage() || 'zh',
    darkmode: getDarkmode() || 'off',
    autotracker: getAutotracker() || 'off',
})
// mutations
const mutations = {
    // SET_NOTIC: (state, data) => {
    //     state.notic = data
    // },
    SET_SEARCHRANKINGDATA: (state, data) => {
        state.searchRankingData = data
    },
    SET_POLYSTATUSDATA: (state, data) => {
        state.polyStatusData = data
    },
    SET_TRACKERLIST: (state, data) => {
        state.trackerList = data
    },
    SET_VERSION: (state, data) => {
        state.version = data
    },
    SET_LANGUAGE: (state, data) => {
        state.language = data
    },
    SET_DARKMODE: (state, data) => {
        state.darkmode = data
    },
    SET_AUTOTRACKER: (state, data) => {
        state.autotracker = data
    },
    set_searchJavlibrary: (state, data) => {
        state.searchJavlibrary = data
    },
    set_searchJavlibraryTotal: (state, data) => {
        state.searchJavlibraryTotal = data
    },
    set_searchDoubanlibrary: (state, data) => {
        state.searchDoubanlibrary = data
    },
    set_searchDoubanlibraryTotal: (state, data) => {
        state.searchDoubanlibraryTotal = data
    },
}
// getters
const getters = {
    title: (state) => state.title,
    // notic: (state) => state.notic,
    searchJavlibrary: (state) => state.searchJavlibrary,
    searchJavlibraryTotal: (state) => state.searchJavlibraryTotal,
    searchDoubanlibrary: (state) => state.searchDoubanlibrary,
    searchDoubanlibraryTotal: (state) => state.searchDoubanlibraryTotal,
    version: (state) => state.version,
    language: (state) => state.language,
    darkmode: (state) => state.darkmode,
    trackerList: (state) => state.trackerList,
    autotracker: (state) => state.autotracker,
    polyStatusData: (state) => state.polyStatusData,
    searchRankingData: (state) => state.searchRankingData,

    // initconfig: (state) => state.initconfig,
    // initconfig: (state) => state.initconfig,
}

// actions
const actions = {
    // 获取配置信息
    getConfig({ commit }) {
        return new Promise((resolve, reject) => {
            getConfig().then(data => {
                // commit('SET_NOTIC', response.data.notic)
                commit('SET_SEARCHRANKINGDATA', data.searchRankingData)
                commit('SET_POLYSTATUSDATA', data.polyStatusData)
                commit('SET_TRACKERLIST', data.trackerList)
                setVersion(data.version)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    changeLanguage({ commit }, data) {
        setLanguage(data)
        commit("SET_LANGUAGE", data)
    },
    changeDarkmode({ commit }, data) {
        setDarkmode(data)
        commit("SET_DARKMODE", data)
    },
    changeAutotracker({ commit }, data) {
        setAutotracker(data)
        commit("SET_AUTOTRACKER", data)
    },
    changeSearchJavlibrary({ commit }, data) {
        setSearchJavlibrary(data)
        commit("set_searchJavlibrary", data)
    },
    changeSearchJavlibraryTotal({ commit }, data) {
        setSearchJavlibraryTotal(data)
        commit("set_searchJavlibraryTotal", data)
    },
    changeSearchDoubanlibrary({ commit }, data) {
        setSearchDoubanlibrary(data)
        commit("set_searchDoubanlibrary", data)
    },
    changeSearchDoubanlibraryTotal({ commit }, data) {
        setSearchDoubanlibraryTotal(data)
        commit("set_searchDoubanlibraryTotal", data)
    },
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}