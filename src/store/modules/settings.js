/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
// import { isJson } from '@/utils/validate'
import API from '@/api/api_list'
import api from '@/api'
import {
    logo,
    title,
} from '@/config'


// const initdata = () => {
//     api.init(API.API_BT_INIT).then((data) => {
//         commit('UPDATE_INIT', data);
//     }).catch((error) => {
//         console.log("错误信息：" + error);
//     });
// }
const initLanguage = () => {
    let language = localStorage.getItem('language')
    if (!language) {
        let lang = navigator.language || navigator.userLanguage
        lang = lang.substr(0, 2) == 'zh' ? 'zh' : 'en'
        localStorage.setItem('language', lang)
        return lang
    }
    return language
}
const language = initLanguage()
const darkmode = localStorage.getItem('darkmode')
const version = localStorage.getItem('version')
const autotracker = localStorage.getItem('autotracker')
const state = () => ({
    logo,
    title,
    notic: '',
    tracker: '',
    version: version || '1.0.0',
    polystatusdata: [],
    darkmode: darkmode || 'off',
    autotracker: autotracker || 'on',
    language: language || 'zh',
})
const getters = {
    logo: (state) => state.logo,
    notic: (state) => state.notic,
    title: (state) => state.title,
    version: (state) => state.version,
    darkmode: (state) => state.darkmode,
    language: (state) => state.language,
    autotracker: (state) => state.autotracker,
    polystatusdata: (state) => state.polystatusdata,

}
const mutations = {
    /**
  * @description 设置用户名
  * @param {*} state
  * @param {*} username
  */
    // setNotic(state, username) {
    //     state.username = username
    // },
    changeLanguage(state, language) {
        state.language = language
        localStorage.setItem('language', language)
    },
    changeTheme(state, darkmode) {
        state.darkmode = darkmode
        localStorage.setItem('darkmode', darkmode)
    },
    changeAutotracker: (state, autotracker) => {
        state.autotracker = autotracker
        localStorage.setItem('autotracker', autotracker)
    },
}
const actions = {
    changeLanguage: ({ commit }, language) => {
        commit('changeLanguage', language)
    },
    changeTheme: ({ commit }, darkmode) => {
        commit('changeTheme', darkmode)
    },
    changeAutotracker: ({ commit }, autotracker) => {
        commit('changeAutotracker', autotracker)
    },
    initdata({ state }) {
        if (state.darkmode == "on") {
            document.body.classList.add("dark");
        }
        api.init(API.API_BT_INIT).then((data) => {
            state.notic = data.notic
            state.tracker = data.tracker
            state.polystatusdata = data.polystatusdata
        }).catch((error) => {
            console.log("错误信息：" + error);
        });
        api.checkversion(API.API_BT_CHECKVERSION).then((data) => {
            state.version = data.version
            let localversion = localStorage.getItem('version');
            if (localversion && localversion != data.version) {
                localStorage.setItem('version', data.version);
                window.location.reload();
                return;
            } else {
                localStorage.setItem('version', data.version);
            }
        }).catch((error) => {
            console.log("错误信息：" + error);
        });
    },
}
export default { state, getters, mutations, actions }
