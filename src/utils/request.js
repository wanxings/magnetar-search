import axios from 'axios'
import { Message, Notice, Spin } from 'view-design';
import store from '../store/index.js';
import { getToken } from '@/utils/auth'
import {
    baseURL, version,
} from '@/config'
// 创建axios实例
const service = axios.create({
    baseURL: baseURL + version, // api 的 base_url
    timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['authorization'] = "Bearer " + getToken() // 让每个请求携带自定义token
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        console.log("res", res)
        if (res.code === 200 || res.code === 0) {
            return res.data
        }
        if (res.code === 301) {
            window.location.href = res.href;
        }
        if (res.code === 401) {
            console.log("token过期或不合法")
            Notice.warning({
                title: '温馨提示',
                desc: '登陆状态已过期,请前往扩展程序或登陆页面重新登陆,3s后自动跳转至登陆页',
                duration: 5,
            });
            store.dispatch('user/FedLogOut')
            setTimeout(() => {
                location.href = '/login'
            }, 3000)
        }
        Spin.hide();
        Message.destroy();
        if (res.code === 403) {
            Message.warning({
                content: "请求参数含非法字符"
            })
            return Promise.reject(res)
        }
        console.log(store.getters['app/language'])
        Message.error(res[store.getters['app/language']])
        return Promise.reject(res)
    },
    error => {
        Spin.hide();
        Message.destroy();
        console.log("error");
        console.log(error);
        console.log(error.response);
        if (error.response && error.response.status == 403) {
            Message.error({
                content: "请求参数含非法字符"
            })
        } else if (error.response && error.response.status == 401) {
            console.log(error.response.data.code)
            console.log(error.response.data)
            if (error.response.data.code !== 10005) {
                Message.error({
                    content: error.response.data.msg || '请求失败'
                })

            } else {
                console.log("token过期或不合法")
                Notice.warning({
                    title: '温馨提示',
                    desc: '登陆状态已过期,请前往扩展程序或登陆页面重新登陆,3s后自动跳转至登陆页',
                    duration: 5,
                });
                store.dispatch('user/FedLogOut')
                setTimeout(() => {
                    location.href = '/login'
                }, 3000)
            }

        } else {
            console.log('interceptorsERROR:%o', error) // for debug
            Message.error({
                content: error.response.data.msg || "接口异常"
            })
        }

        return Promise.reject(error)

    }
)

export default service