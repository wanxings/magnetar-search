
const { version } = require('@/config')
module.exports = [
  {
    url: `/user/${version}/user/info`,
    type: 'get',
    response() {
      return {
        "code": 0,
        "msg": "成功",
        "zh": "成功",
        "en": "Success",
        "data": {
          "name": "wanxings",
          "avatar": "https://api.magnetar.cc/uploads/20210727/a7461c33694b683b60c8b54e2a8a1669.png",
          "email": "4982837@qq.com",
          "leave": 0,
          "credits": 3650
        }
      }
    }
  }
]
