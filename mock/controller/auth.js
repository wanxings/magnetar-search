const { version } = require('@/config')
module.exports = [
    {
        url: `/user/${version}/auth/login`,
        type: 'post',
        response() {
            return {
                "code": 0,
                "msg": "登录成功",
                "zh": "登录成功",
                "en": "Success",
                "data": {
                    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlzcyI6ImNpeGluZyIsImF1ZCI6IndhbnhpbmciLCJpYXQiOjE2NDgxNzMyODUsIm5iZiI6MTY0ODE3MzI4NSwiZXhwIjoxNjQ4Nzc4MDg1fQ.jqVSmEgUg9410o4L-nYXnZR5Tu-dw6kdyCTPFfSahuM",
                    "name": "wanxings",
                    "avatar": "https://api.magnetar.cc/uploads/20210727/a7461c33694b683b60c8b54e2a8a1669.png",
                    "email": "4982837@qq.com",
                    "leave": 0,
                    "credits": 3650
                }
            }
        },
    },

]
