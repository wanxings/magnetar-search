"use strict";

import Vue from 'vue';
import axios from "axios";
import ViewUI from 'view-design'
import router from '@/router' 
import { getToken } from '@/api/auth'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// let config = {
//   // baseURL: process.env.baseURL || process.env.apiUrl || ""
//   // timeout: 60 * 1000, // Timeout
//   // withCredentials: true, // Check cross-site Access-Control
// };

// const _axios = axios.create(config);

axios.interceptors.request.use(
  function (config) {
    let usertoken = getToken();
    if(usertoken){
      config.headers.common['token'] =usertoken;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    if (response.data.code) {
      switch (response.data.code) {
        case 401:
          ViewUI.Message.error({
            content: '用户未登录'
          })
          router.push({
            path: '/user/login',
            query: { redirect: window.document.location.href }
          })
          break;
        case 403:
          ViewUI.Message.error({
            content: '登录过期'
          })
          localStorage.removeItem("token");//删除token的值
          router.push({
            path: '/user/login',
            query: { redirect: window.document.location.href }
          })
          break;
        case 404:
          ViewUI.Message.error({
            content: '无效路径'
          })
          router.push({ name: 'Home' })
          break;
        default:
          break;
      }
    }
    // Do something with response data
    return response;
  },
  function (error) {


    return Promise.reject(error);

    // Do something with response error

  }
);

Plugin.install = function (Vue) {
  Vue.axios = axios;
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios;
      }
    },
    $axios: {
      get() {
        return axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
