import { getConfig } from '@/api/app'
import {
    getVersion,
    getLanguage,
    getDarkmode,
    getAutotracker,
    getSearchEngine,
    getSearchPageComponent,

    setVersion,
    setLanguage,
    setDarkmode,
    setAutotracker,
    setSearchEngine,
    setSearchPageComponent,
} from '@/utils/app'
import {
    logo,
    title,
    searchEngine,
    searchPageComponent,
} from '@/config'
if (!getSearchEngine()) setSearchEngine(searchEngine)
if (!getSearchPageComponent()) setSearchPageComponent(searchPageComponent)
const state = () => ({
    logo,
    title,
    // notic: '',
    searchRankingData: [],
    polyStatusData: [],
    trackerList: '',
    version: getVersion() || null,
    language: getLanguage() || 'zh',
    darkmode: getDarkmode() || 'off',
    autotracker: getAutotracker() || 'off',
    searchEngine: getSearchEngine(),
    searchPageComponent: getSearchPageComponent(),
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
}
// getters
const getters = {
    title: (state) => state.title,
    version: (state) => state.version,
    language: (state) => state.language,
    darkmode: (state) => state.darkmode,
    trackerList: (state) => state.trackerList,
    autotracker: (state) => state.autotracker,
    polyStatusData: (state) => state.polyStatusData,
    searchRankingData: (state) => state.searchRankingData,
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
    changeSearchEngine({ state }) {
        setSearchEngine(state.searchEngine)
    },
    changeSearchPageComponent({ state }) {
        setSearchPageComponent(state.searchPageComponent)
    },
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}