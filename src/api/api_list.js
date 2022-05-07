const host = "https://api.magnetar.cc"
module.exports = {
        API_BT_INIT: host + '/search/v2.index/init', //网站基础信息
        API_NOTIC: host + '/user/v1.index/webnotic', //公告
        API_BT_SEARCH: host + '/search/v2.index/Search', //磁力搜索
        API_BT_FILES: host + '/search/v2.index/Filelist', //文件列表
        API_BT_POLYSTATUS: host + '/search/v2.index/Getpolymericstatus', //聚合搜索状态
        API_BT_POLYMERIC: host + '/search/v1.index/Getpolymeric', //聚合搜索
        API_AV_LIST: host + '/video/v1.index/Getvideo', //AV数据
        API_AV_SEARCH: host + '/search/v2.index/searchMovie', //磁力影片搜索
        API_AV_SUGREC: host + '/video/v1.index/sugrec', //AV即时搜索
        API_AV_SUBJECT: host + '/video/v1.index/Getdetail', //AV详情数据
        API_USER_LOGIN: host + '/user/v1.login/login', //登陆接口
        API_USER_REG: host + '/user/v1.login/register', //注册接口
        API_USER_UPLOADHEADIMG: host + '/user/v1.user/uploadheadimg', //上传头像
        API_USER_EDITUSERINFO: host + '/user/v1.user/edituserinfo', //修改个人资料
        API_USER_CHANGEPWD: host + '/user/v1.user/changepwd', //修改密码
        API_KEYWORD_RANKING: host + '/search/v2.index/GetSearchRanking', //热门搜索
        API_BT_Tracker: 'https://newtrackon.com/api/stable',//tracker
        API_BT_Seedtolink: host +'/tool/v1.conversionbt/seedtolink',//种子上传
        API_BT_Linktoseed: host +'/tool/v1.conversionbt/linktoseed',//磁力转种子
        API_BT_CHECKVERSION:  `//${window.location.host}/version.json?t=${new Date().getTime()}`,//获取网站当前版本
        API_BT_Searchtips: host + '/search/v2.index/Searchtips',//搜索建议
        API_BT_Faceimglink:host + '/tool/v1.face/actressfacerecognition',//女优识别图片上传接口
}