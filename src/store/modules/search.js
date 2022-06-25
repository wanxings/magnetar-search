import {
  btSearch,
  javSearch,
  actressSearch,
  imageSearch,
  sugrec,
  getBtFileList,
  getScrapelink,
  submitPolyTask,
  submitComments,
  getPolySearchData,
  hashToSeed,
  getJav,
  getJavSubject,
  reportComment,
  likesComment,
} from '@/api/search'
import {
  getSearchEngine,
  getSearchPageComponent,
} from '@/utils/app'
const state = () => ({
  keyword: '',
  total: 0,
  time: 0,
  btQuery: {
    m: 'correla',
    t: 'all',
    p: 1,
  },
  javQuery: {
    p: 1,
  },
  acQuery: {
    p: 1,
  },
  imageQuery: {
    file: null,
    id: null,
    src: null
  },
  imageParamet: {
    localName: null,
    imageTaskId: null,
    src: null
  },
  uploadImageModalStatus: false,
  btSearchData: [],
  btPolySearchData: [],
  javSearchData: [],
  relatedKeywordData: [],
  movieSearchData: [],
  acSearchData: [],
  polyLicenseId: null,
})
// mutations
const mutations = {
  set_keyword(state, data) {
    data = data.replace(/['$|'$|`$|@$]/g, ' ')
    console.log("set_keyword:%o", data);
    state.keyword = data;
  },
  set_btQuery(state, data) {
    console.log("set_btQuery:%o", data);
    Object.assign(state.btQuery, data)
  },
  set_javQuery(state, data) {
    console.log("set_javQuery:%o", data);
    Object.assign(state.javQuery, data)
  },
  set_acQuery(state, data) {
    console.log("set_acQuery:%o", data);
    Object.assign(state.acQuery, data)
  },
  set_imageQuery(state, data) {
    console.log("set_imageQuery:%o", data);
    Object.assign(state.imageQuery, data)
  },
  set_time(state, data) {
    console.log("set_time:%o", data);
    state.time = data;
  },
  set_total(state, data) {
    console.log("set_total:%o", data);
    state.total = data;
  },
  set_btSearchData(state, data) {
    console.log("set_btSearchData:%o", data);
    state.btSearchData = data;
  },
  set_btPolySearchData(state, data) {
    console.log("set_btPolySearchData:%o", data);
    state.btPolySearchData = data;
  },
  set_relatedKeywordData(state, data) {
    console.log("set_relatedKeywordData:%o", data);
    state.relatedKeywordData = data;
  },
  set_polyLicenseId(state, data) {
    console.log("set_polyLicenseId:%o", data);
    state.polyLicenseId = data;
  },
  set_javSearchData(state, data) {
    console.log("set_javSearchData:%o", data);
    state.javSearchData = data;
  },
  set_movieSearchData(state, data) {
    console.log("set_movieSearchData:%o", data);
    state.movieSearchData = data;
  },
  set_acSearchData(state, data) {
    console.log("set_acSearchData:%o", data);
    state.acSearchData = data;
  },
  init_searchdata(state) {
    console.log("init_searchdata");
    state.time = 0;
    state.total = 0;
    state.btSearchData = [];
    state.javSearchData = [];
    state.movieSearchData = [];
    state.acSearchData = [];
    state.btPolySearchData = [];
    state.relatedKeywordData = [];
    state.polyLicenseId = null;
  },
  set_uploadImageModalStatus(state, data) {
    console.log("set_uploadImageModalStatus:%o", data);
    state.uploadImageModalStatus = data;
  },

}
// getters
const getters = {
  time: (state) => state.time,
  total: (state) => state.total,
  keyword: (state) => state.keyword,
  btQuery: (state) => state.btQuery,
  acQuery: (state) => state.acQuery,
  javQuery: (state) => state.javQuery,
  imageQuery: (state) => state.imageQuery,
  acSearchData: (state) => state.acSearchData,
  btSearchData: (state) => state.btSearchData,
  javSearchData: (state) => state.javSearchData,
  movieSearchData: (state) => state.movieSearchData,
  polyLicenseId: (state) => state.polyLicenseId,
  btPolySearchData: (state) => state.btPolySearchData,
  relatedKeywordData: (state) => state.relatedKeywordData,
  uploadImageModalStatus: (state) => state.uploadImageModalStatus,
}

// actions
const actions = {
  btSearch({ state, commit }) {
    return new Promise((resolve, reject) => {
      let searchEngine = getSearchEngine()
      let { relatedSearch } = getSearchPageComponent()
      btSearch({ q: state.keyword, ...state.btQuery, ...searchEngine, relatedSearch }).then(data => {
        commit("set_total", data.total)
        commit("set_time", data.time)
        commit("set_polyLicenseId", data.polyLicenseId)
        commit("set_btSearchData", data.btSearchData)
        commit("set_relatedKeywordData", data.relatedKeywordData)
        commit("set_javSearchData", data.javSearchData)
        commit("set_acSearchData", data.actresSearchData)
        commit("set_movieSearchData", data.movieSearchData)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  javSearch({ state, commit }) {
    return new Promise((resolve, reject) => {
      javSearch({ q: state.keyword, ...state.javQuery }).then(data => {
        commit("set_total", data.total)
        commit("set_time", data.time)
        commit("set_javSearchData", data.javSearchData)
        commit("set_acSearchData", data.acSearchData)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getJav(context, selectFrom) {
    return new Promise((resolve, reject) => {
      getJav(selectFrom).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getJavSubject(context, id) {
    return new Promise((resolve) => {
      getJavSubject({ id }).then(data => {
        resolve(data)
      })
    })
  },
  actressSearch({ state, commit }) {
    return new Promise((resolve, reject) => {
      actressSearch({ q: state.keyword, ...state.acQuery }).then(data => {
        commit("set_total", data.total)
        commit("set_time", data.time)
        commit("set_acSearchData", data.acSearchData)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  submitComments(context, Fromdata) {
    return new Promise((resolve, reject) => {
      submitComments(Fromdata).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  reportComment(context, cid) {
    return new Promise((resolve, reject) => {
      reportComment({ cid }).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  likesComment(context, cid) {
    return new Promise((resolve, reject) => {
      likesComment({ cid }).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  imageSearch({ state, commit }) {
    return new Promise((resolve, reject) => {
      let id = state.imageQuery.id;
      imageSearch({ id }).then(data => {
        commit("set_imageQuery", { file: data.file, src: data.src, })
        commit("set_time", data.time)
        commit("set_total", data.total)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBtFileList(context, fid) {
    return new Promise((resolve, reject) => {
      getBtFileList({ fid }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getScrapelink(context, detailsLink) {
    return new Promise((resolve, reject) => {
      getScrapelink({ detailsLink }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  submitPolyTask({ state, commit }) {
    return new Promise((resolve, reject) => {
      let { polyLicenseId } = state
      submitPolyTask({ polyLicenseId }).then(data => {
        commit('set_polyLicenseId', null)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPolySearchData({ commit }, pid) {
    return new Promise((resolve, reject) => {
      let polyLicenseId = pid
      getPolySearchData({ polyLicenseId }).then(data => {
        commit("set_total", data.total)
        commit("set_time", data.time)
        commit("set_btPolySearchData", data.btPolySearchData)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // getPolySearchData({ commit }, polyTaskId) {
  //   return new Promise((resolve, reject) => {
  //     getPolySearchData({ polyTaskId }).then(data => {
  //       if (data) {
  //         commit("set_total", data.total)
  //         commit("set_time", data.time)
  //         commit("set_btPolySearchData", data.btPolySearchData)
  //         resolve(data)
  //       } else {
  //         resolve(false)
  //       }
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  hashToSeed(context, hash) {
    return new Promise((resolve, reject) => {
      hashToSeed({ hash }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  sugrec(context, keyword) {
    return new Promise((resolve, reject) => {
      sugrec({ keyword }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  Updatekeyword({ commit }, keyword) {
    commit('changeKeyword', keyword)
  },
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

