// import api from '@/api'
import { addJavToFavorites, createFavorites } from '@/api/jav'
const state = () => ({
  javSearchParamet: {
    q: '',
    t: 'DVDID',
    p: 1
  },
  // keyword: '',
  // page: 1,
  // sorts: 'time',
  // classification: 'censored',
  // date: new Date()
})
// mutations
const mutations = {
  SET_JAVSEARCHPARAMET(state, data) {
    console.log('javparamet:%o', data)
    Object.assign(state.javSearchParamet, data)
  },
}
// getters
const getters = {
  javSearchParamet: (state) => state.javSearchParamet,
  // keyword: (state) => state.keyword,
  //   cartTotalPrice: (state, getters) => {
  //     return getters.cartProducts.reduce((total, product) => {
  //       return total + product.price * product.quantity
  //     }, 0)
  //   }
}
 
// actions
const actions = {
  addJavToFavorites(context, formData) {
    return new Promise((resolve) => {
      addJavToFavorites(formData).then(() => {
        resolve()
      })
    })
  },
  createFavorites(context, name) {
    return new Promise((resolve) => {
      createFavorites({ name }).then((data) => {
        resolve(data)
      })
    })
  },
  // getAvData({ state }) {
  //   return new Promise((resolve, reject) => {
  //     getAvData(state.javparamet).then(data => {
  //       // commit("SET_TOTAL", response.total)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
    // return axios.get(API.API_AV_LIST + buildgetAvData(state)).then((response) => {
    //   return response.data
    // }).catch((err) => {
    //   console.log(err)
    // });
  // },
  // getAvSubject({ state }) {
  //   return new Promise((resolve, reject) => {
  //     getAvSubject(state.javparamet).then(data => {
  //       console.log(data)
  //       // commit("SET_TOTAL", response.total)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
    // return axios.get(API.API_AV_SUBJECT + "?id=" + id).then((response) => {
    //   return response.data
    // }).catch((err) => {
    //   console.log(err)
    // });
  // }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}