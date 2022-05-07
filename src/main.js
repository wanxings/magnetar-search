import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import store from './store'
import router from './router'
// import './plugins/axios'
import VueClipboard from 'vue-clipboard2'
// import querystring from 'querystring'
import VueLazyload from 'vue-lazyload'
import 'swiper/swiper-bundle.css'
import VueDPlayer from "vue-dplayer";//视频播放
//import VueCropper from 'vue-cropper'//头像裁剪插件
import "vue-dplayer/dist/vue-dplayer.css";
import i18n from '@/i18n'
import { isExternal } from '@/utils/validate'
import { baseURL,pwa } from './config'

// import API from '@/api/api_list'


/**
 * 图片预览
 */
 console.log(process.env.NODE_ENV)
console.log(isExternal(baseURL))

// if (process.env.NODE_ENV === 'developments' && isExternal(baseURL)) {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }


/**
 * 图片预览
 */
import hevueImgPreview from 'hevue-img-preview'
import 'hevue-img-preview/css/theme-dark.css'



// Vue.prototype.$logurl = ' https://cilixing-static.oss-cn-shanghai.aliyuncs.com/static/image/magnetar.png'

/**
 * md5,querystring
 */
// Vue.prototype.$querystring = querystring
Vue.use(hevueImgPreview)
Vue.use(VueClipboard)
Vue.use(VueDPlayer)
//Vue.use(VueCropper)


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/img/loading.gif',
  loading: '/img/loading.gif',
  attempt: 1
})
if (pwa) require('./registerServiceWorker')
Vue.config.productionTip = false

new Vue({
 router,
 store,
 i18n,
 render: h => h(App)
}).$mount('#app')
