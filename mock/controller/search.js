const { version } = require('@/config')


module.exports = [
    {
        url: `/search/${version}/bt/btsearch`,
        type: 'get',
        response() {
            return {
                "code": 0,
                "msg": "成功",
                "zh": "成功",
                "en": "Success",
                "data": {
                    "total": 1,
                    "time": "0.228",
                    "polyLicenseId": "polySearch_623d2831ec06b",
                    "btSearchData": [
                        {
                            "tid": "dHuIdIuBdH0=",
                            "hash": "68710dffc9dfb27f4e5205cfeb94a099f19eec52",
                            "name": "<font style='color:#dd4b39;'>SKMJ-272</font>",
                            "files": 10,
                            "size": 13438915299,
                            "fire": 5,
                            "vio": null,
                            "dhttype": 1,
                            "updatetime": "2022-03-23 02:34:03"
                        }
                    ],
                    "javSearchData": [
                        {
                            "id": "eYOHeoiA",
                            "code": "<font style='color:#dd4b39;'>SKMJ-272</font>",
                            "title": "素人美少女とリモコンバイブお散歩！！大ヒット御礼PREMIUM BEST！！「もう我慢できません…//」人混みの中ビクビク震えてイキまくってしまう女子たち！人生初の羞恥プレイでまさかのエロスイッチオン！永久保存版！！",
                            "rdate": "2022-03-25 00:00:00",
                            "length": 300,
                            "headimg": {
                                "simg": "https://pics.dmm.co.jp/mono/movie/adult/h_1324skmj272/h_1324skmj272ps.jpg",
                                "bimg": "https://pics.dmm.co.jp/mono/movie/adult/h_1324skmj272/h_1324skmj272pl.jpg",
                                "jav_id": "eYOHeoiA"
                            },
                            "pvideo": {
                                "jav_id": "eYOHeoiA",
                                "dmb": "https://cc3001.dmm.co.jp/litevideo/freepv/h/h_1/h_1324skmj272/h_1324skmj272_dmb_w.mp4"
                            },
                            "avactress": [],
                            "avgenre": [
                                {
                                    "name": "少女"
                                },
                                {
                                    "name": "合集"
                                },
                                {
                                    "name": "4小时以上作品"
                                },
                                {
                                    "name": "业余"
                                },
                                {
                                    "name": "野外・露出"
                                },
                                {
                                    "name": "羞耻"
                                },
                                {
                                    "name": "玩具"
                                },
                                {
                                    "name": "企画"
                                }
                            ],
                            "detailimg": []
                        }
                    ]
                }
            }
        },
    },
    {
        url: `/search/${version}/jav/javsearch`,
        type: 'get',
        response() {
            return {
                "code": 0,
                "msg": "成功",
                "zh": "成功",
                "en": "Success",
                "data": {
                    "total": 1,
                    "time": "0.059",
                    "javSearchData": [
                        {
                            "id": "eYOHeoiA",
                            "code": "<font style='color:#dd4b39;'>SKMJ-272</font>",
                            "title": "素人美少女とリモコンバイブお散歩！！大ヒット御礼PREMIUM BEST！！「もう我慢できません…//」人混みの中ビクビク震えてイキまくってしまう女子たち！人生初の羞恥プレイでまさかのエロスイッチオン！永久保存版！！",
                            "rdate": "2022-03-25 00:00:00",
                            "length": 300,
                            "headimg": {
                                "simg": "https://pics.dmm.co.jp/mono/movie/adult/h_1324skmj272/h_1324skmj272ps.jpg",
                                "bimg": "https://pics.dmm.co.jp/mono/movie/adult/h_1324skmj272/h_1324skmj272pl.jpg",
                                "jav_id": "eYOHeoiA"
                            },
                            "pvideo": {
                                "jav_id": "eYOHeoiA",
                                "dmb": "https://cc3001.dmm.co.jp/litevideo/freepv/h/h_1/h_1324skmj272/h_1324skmj272_dmb_w.mp4"
                            },
                            "avactress": [],
                            "avgenre": [
                                {
                                    "name": "少女"
                                },
                                {
                                    "name": "合集"
                                },
                                {
                                    "name": "4小时以上作品"
                                },
                                {
                                    "name": "业余"
                                },
                                {
                                    "name": "野外・露出"
                                },
                                {
                                    "name": "羞耻"
                                },
                                {
                                    "name": "玩具"
                                },
                                {
                                    "name": "企画"
                                }
                            ],
                            "detailimg": []
                        }
                    ],
                    "acSearchData": null
                }
            }
        },
    },
    {
        url: `/search/${version}/image/imagesearch`,
        type: 'get',
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
    {
        url: `/search/${version}/bt/getFileList`,
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
    {
        url: `/search/${version}/bt/getScrapelink`,
        type: 'get',
        response() {
            // return {
            //     "code": 0,
            //     "msg": "抓取成功",
            //     "zh": "抓取成功",
            //     "en": "Success",
            //     "data": {
            //         "results": [
            //             "3A3812C5399BD6E8F6F99832A2D7C1051A2A7FBF9",
            //             "3A3812C5399BD6E8F6F99832A2D7C1051A2A7FBF9",
            //         ],
            //         "code": 0,
            //         "errorMsg": "抓取成功",
            //     }
            // }
            return {
                "code": 0,
                "msg": "抓取成功",
                "zh": "抓取成功",
                "en": "Success",
                "data": {
                    "results": null,
                    "code": 10001,
                    "errorMsg": "请求错误",
                }
            }
        },
    },

    {
        url: `/search/${version}/bt/polySearch`,
        type: 'get',
        response() {
            return {
                "code": 0,
                "msg": "成功",
                "zh": "成功",
                "en": "Success",
                "data": {
                    "btPolySearchData": [
                        {
                            "searchEngine": "zooqle",
                            "code": 0,
                            "errorMsg": "抓取成功",
                            "results": [
                                {
                                    "hash": "3A3811C5399BD6E8F6F99832A2D7C1051A2A7FBF9",
                                    "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                                    "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.5 GB</div></div>",
                                    "updatetime": "yesterday",

                                }, {
                                    "hash": "3A3812C5399BD6E8F6F99832A2D7C1051A2A7FBF9",
                                    "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                                    "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.5 GB</div></div>",
                                    "updatetime": "yesterday",

                                }, {
                                    "hash": "3A381C35399BD6E8F6F99832A2D7C1051A2A7FBF9",
                                    "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                                    "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.5 GB</div></div>",
                                    "updatetime": "yesterday",
                                }
                            ],
                            "hash": "953F21F805D2B23B27545EC3D5556FFDD545F37C",
                            "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                            "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.4 GB</div></div>",
                            "updatetime": "yesterday",

                        }, {
                            "searchEngine": "btsow",
                            "code": 500,
                            "errorMsg": "抓取异常",
                            "results": null,
                            "hash": "953F21F805D2B23B27545EC3D5556FFDD545F37C",
                            "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                            "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.4 GB</div></div>",
                            "updatetime": "yesterday",

                        },
                        {
                            "searchEngine": "1337x",
                            "code": 0,
                            "errorMsg": "抓取成功",
                            "results": [
                                {
                                    "hash": null,
                                    "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                                    "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.5 GB</div></div>",
                                    "updatetime": "yesterday",
                                    "detailsLink": "https://test.com"

                                }, {
                                    "hash": null,
                                    "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                                    "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.5 GB</div></div>",
                                    "updatetime": "yesterday",
                                    "detailsLink": "https://test.com"
                                }, {
                                    "hash": null,
                                    "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                                    "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.5 GB</div></div>",
                                    "updatetime": "yesterday",
                                    "detailsLink": "https://test.com"
                                }
                            ],
                            "hash": "953F21F805D2B23B27545EC3D5556FFDD545F37C",
                            "name": "<hl>SKMJ</hl>-<hl>272</hl>",
                            "size": "<div class=\"progress prog prog-narrow trans90\"><div class=\"progress-bar prog-blue prog-l\" style=\"width: 100%\">12.4 GB</div></div>",
                            "updatetime": "yesterday",

                        }

                    ],
                    "time": "8.532",
                    "total": 10
                }
            }
        },
    },

]