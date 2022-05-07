import axios from "axios";
// const API_NOTIC = 'https://api.clx.pub/extensions/v2.index/webnotic' //获取配置接口地址
// const API_SEARCH = 'https://api.magnetar.cc/search/v1.index/Getsearchdata' //搜索接口
// const API_FILES = 'https://api.magnetar.cc/search/v1.index/Getfilelist' //文件列表接口
// const API_POLYMERIC = 'https://api.magnetar.cc/search/v1.index/Getpolymeric' //聚合搜索接口
// const API_VIDEODATA = 'https://api.magnetar.cc/video/v2.index/Getvideo' //影片数据接口
// const API_VIDEOSUGREC = 'https://api.magnetar.cc/video/v2.index/sugrec' //影片即时搜索接口
// const API_VIDEODETAIL = 'https://api.magnetar.cc/video/v2.index/Getdetail' //影片详情数据接口
// Vue.prototype.$apinotic = 'https://api.clx.pub/extensions/v2.index/webnotic' //获取配置接口地址
// Vue.prototype.$apisearch = 'https://api.magnetar.cc/search/v1.index/Getsearchdata' //搜索接口
// Vue.prototype.$apifiles = 'https://api.magnetar.cc/search/v1.index/Getfilelist' //文件列表接口
// Vue.prototype.$apipolymeric = 'https://api.magnetar.cc/search/v1.index/Getpolymeric' //聚合搜索接口
// Vue.prototype.$apivideodata = 'https://api.magnetar.cc/video/v2.index/Getvideo' //影片数据接口
// Vue.prototype.$apivideosugrec = 'https://api.magnetar.cc/video/v2.index/sugrec' //影片即时搜索接口
// Vue.prototype.$apivideodetail = 'https://api.magnetar.cc/video/v2.index/Getdetail' //影片详情数据接口
export default class Api {
  init(url) {
    return new Promise(function (resolve, reject) {
      axios.get(url).then(response => {
        let code = response.data.code;
        if (code == 200) {
          resolve(response.data.data);
        } else {
          reject(response.data.msg);
        }
      }).catch(error => {
        reject(error);
      });
    })
  }
  checkversion(url) {
    return new Promise(function (resolve, reject) {
      axios.get(url).then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
      }).catch(error => {
        reject(error);
      });
    })
  }
  gettracker(url) {
    return new Promise(function (resolve, reject) {
      axios.get(url).then(response => {
        let data = response.data;
        let trackerlist = data.split(/[\r\n]+/); // 根据换行或者回车进行识别
        trackerlist.forEach((item, index) => { // 删除空项
          if (!item) {
            trackerlist.splice(index, 1);
          }
        })
        trackerlist = Array.from(new Set(trackerlist)); // 去重
        trackerlist = trackerlist.join('&tr=');
        resolve("&tr=" + trackerlist);
      }).catch(error => {
        reject(error);
      });
    })
  }
  getnotic(url) {
    return new Promise(function (resolve, reject) {
      axios.get(url).then(response => {
        let code = response.data.code;
        if (code == 200) {
          resolve(response.data.notic.content);
        } else {
          reject(response.data.msg);
        }
      }).catch(error => {
        reject(error);
      });
    })
  }
  getSearchRanking(url) {
    return new Promise(function (resolve, reject) {
      axios.get(url).then(response => {
        let code = response.data.code;
        if (code == 200) {
          resolve(response.data.rankingyes);
        } else {
          reject(response.data.msg);
        }
      }).catch(error => {
        reject(error);
      });
    })
  }
  getuserinfo(url, token) {
    return new Promise(function (resolve, reject) {
      axios.get(url + "?token=" + token, {
        timeout: 10000
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  }
  getConfig() {
    // return new Promise(function (resolve, reject) {
    //   this.axios.post(url, postdata).then((response) => {
    //     let code = response.data.code;
    //     this.drawing = false;
    //     this.loading = false;
    //     this.tooling = false;
    //     switch (code) {
    //       case (code = 200):
    //         this.count = Number(response.data.count);
    //         this.searchtime = response.data.total;
    //         this.dhtdata = response.data.data;
    //         break;
    //       case (code = 204):
    //         this.datastatus = true;
    //         this.searchtime = response.data.total;
    //         if (!polymerictype) {
    //           this.polymerization = true;
    //         }

    //         break;
    //       case (code = 400):
    //         this.datastatus = true;
    //         this.searchtime = 0.0;
    //         this.$Message.error({
    //           content: response.data.msg,
    //           background: true,
    //           duration: 5,
    //         });
    //         break;
    //       case (code = 500):
    //         this.$Message.error({
    //           content: response.data.msg,
    //           background: true,
    //           duration: 5,
    //         });
    //         break;
    //       default:
    //         break;
    //     }
    //   });
    // })
  }
  chromeStorage(data = null) {
    /* eslint-disable */
    console.log("存储数据到本地");
    console.log(data);
    chrome.storage.local.set(data);
  }
}
