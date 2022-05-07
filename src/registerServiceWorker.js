/* eslint-disable no-console */
import { register } from 'register-service-worker'
import { Notice } from "view-design";
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
      Notice.info({
        title: '温馨提示',
        desc: '检测到新版本，正在下载中，请稍后...',
        duration: 8,
      });
    },
    updated() {
      console.log('New content is available; please refresh.')
      // localStorage.setItem('tipsKey', 'on')
      Notice.success({
        title: '温馨提示',
        desc: '更新完成，3S后刷新网站',
        duration: 8,
      });
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    },
  })
}
