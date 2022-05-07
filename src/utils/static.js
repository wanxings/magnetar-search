/**
 * @description 导入所有 controller 模块，浏览器环境中自动输出controller文件夹下Mock接口，请勿修改。
 */
import Mock from 'mockjs'
 import { paramObj } from '@/utils/index'

const files = require.context('../../mock/controller', true, /\.js$/)

const mocks = files.keys().flatMap(files)
console.log("mocks",mocks)
export function mockXHR() {
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
    Mock.XHR.prototype.send = function () {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false
            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType
            }
        }
        if (this.custom.requestHeaders)
            this.custom.options.headers = this.custom.requestHeaders
        this.proxy_send(...arguments)
    }

    function XHRHttpRequest(respond) {
        return function (options) {
            let result
            console.log("options", options)
            console.log("respond", respond)
            console.log("instanceof", respond instanceof Function)
            if (respond instanceof Function) {
                const { body, type, url, headers } = options
                console.log("url", url)
                console.log("bqueryody", paramObj(url))
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: paramObj(url),
                    headers: headers,
                })
            } else {
                result = respond
            }
            return Mock.mock(result)
        }
    }

    mocks.forEach((item) => {
        console.log("item", item)
        Mock.mock(
            new RegExp(item.url),
            item.type || 'get',
            XHRHttpRequest(item.response)
        )
    })
}
