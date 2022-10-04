import {
  btSearch,
  javSearch,
  movieSearch,
  getMovie,
  getMovieSubject,
  javActressSearch,
  actressSearch,
  imageSearch,
  // sugrec,
  getBtFileList,
  getScrapelink,
  submitComments,
  getPolySearchData,
  hashToSeed,
  getJav,
  getJavActress,
  getJavSubject,
  reportComment,
  likesComment,
} from '@/api/search'
import {
  // getSearchEngine,
  getSearchPageComponent,
} from '@/utils/app'
const state = () => ({
  keyword: '',
  imageId: '',
  // imageParamet: {
  //   localName: null,
  //   imageTaskId: null,
  //   src: null
  // },
  relatedKeywordData: [],
})
// mutations
const mutations = {
  set_keyword(state, data) {
    data = data.replace(/['$|'$|`$|@$]/g, ' ')
    console.log("set_keyword:%o", data);
    state.keyword = data;
  },
  set_imageId(state, data) {
    state.imageId = data;
  }
}
// getters
const getters = {
  time: (state) => state.time,
  total: (state) => state.total,
  keyword: (state) => state.keyword,
  polyLicenseId: (state) => state.polyLicenseId,
  relatedKeywordData: (state) => state.relatedKeywordData,
}

// actions
const actions = {
  btSearch({ state }, filterForm) {
    return new Promise((resolve, reject) => {
      // let searchEngine = getSearchEngine()
      let { relatedSearch } = getSearchPageComponent()
      btSearch({ query: state.keyword, ...filterForm, relatedSearch }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  movieSearch({ state }, filterForm) {
    return new Promise((resolve, reject) => {
      movieSearch({ query: state.keyword, ...filterForm }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMovie(context, selectFrom) {
    return new Promise((resolve, reject) => {
      getMovie(selectFrom).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMovieSubject(context, id) {
    return new Promise((resolve) => {
      getMovieSubject({ id }).then(data => {
        resolve(data)
      })
    })
  },
  javSearch({ state }, filterForm) {
    return new Promise((resolve, reject) => {
      javSearch({ query: state.keyword, ...filterForm }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  javActressSearch({ state }, filterForm) {
    return new Promise((resolve, reject) => {
      javActressSearch({ query: state.keyword, ...filterForm }).then(data => {
        resolve(data)
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
  getJavActress(context, selectFrom) {
    return new Promise((resolve, reject) => {
      getJavActress(selectFrom).then(data => {
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
  actressSearch({ state }) {
    return new Promise((resolve, reject) => {
      actressSearch({ query: state.keyword, ...state.acQuery }).then(data => {
        resolve(data)
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
  imageSearch({ state }) {
    return new Promise((resolve, reject) => {
      imageSearch({ id: state.imageId }).then(data => {
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
  getPolySearchData(context, pid) {
    return new Promise((resolve, reject) => {
      let licenseId = pid
      getPolySearchData({ licenseId }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  hashToSeed(context, hash) {
    return new Promise((resolve, reject) => {
      hashToSeed({ hash }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // sugrec(context, keyword) {
  //   return new Promise((resolve, reject) => {
  //     sugrec({ keyword }).then(response => {
  //       resolve(response.data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
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

