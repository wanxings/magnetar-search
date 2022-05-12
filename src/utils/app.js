const darkmodeKey = 'darkmode'
const searchJavlibraryKey = 'searchjavlibrary'
const searchJavlibraryTotalKey = 'searchJavlibraryTotal'
const searchDoubanlibraryKey = 'searchdoubanlibrary'
const searchDoubanlibraryTotalKey = 'searchDoubanlibraryTotal'
const versionKey = 'version'
const autotrackerKey = 'autotracker'
const languageKey = 'language'
const tipsKey = 'tipsKey'
const javSelectFromKey = 'javSelectFrom'

// const UserIdKey = 'Admin-UserId'

export function getDarkmode() {
    return localStorage.getItem(darkmodeKey)
}
export function getSearchJavlibrary() {
    return localStorage.getItem(searchJavlibraryKey)
}
export function getSearchJavlibraryTotal() {
    return localStorage.getItem(searchJavlibraryTotalKey)
}
export function getSearchDoubanlibrary() {
    return localStorage.getItem(searchDoubanlibraryKey)
}
export function getSearchDoubanlibraryTotal() {
    return localStorage.getItem(searchDoubanlibraryTotalKey)
}
export function getJavSelectFrom() {
    return JSON.parse(localStorage.getItem(javSelectFromKey))
}
export function getVersion() {
    return localStorage.getItem(versionKey)
}
export function getTips() {
    return localStorage.getItem(tipsKey) === 'off' ? false : true
}
export function getAutotracker() {
    return localStorage.getItem(autotrackerKey)
}
export function getLanguage() {
    let language = localStorage.getItem(languageKey)
    if (!language) {
        let lang = navigator.language || navigator.userLanguage
        lang = lang.substr(0, 2) == 'zh' ? 'zh' : 'en'
        localStorage.setItem(languageKey, lang)
        return lang
    }
    return language
}

export function setDarkmode(data) {
    return localStorage.setItem(darkmodeKey, data)
}
export function setSearchJavlibrary(data) {
    return localStorage.setItem(searchJavlibraryKey, data)
}
export function setSearchJavlibraryTotal(data) {
    return localStorage.setItem(searchJavlibraryTotalKey, data)
}
export function setSearchDoubanlibrary(data) {
    return localStorage.setItem(searchDoubanlibraryKey, data)
}
export function setSearchDoubanlibraryTotal(data) {
    return localStorage.setItem(searchDoubanlibraryTotalKey, data)
}
export function setJavSelectFrom(data) {
    return localStorage.setItem(javSelectFromKey, JSON.stringify(data));
}
export function setVersion(data) {
    return localStorage.setItem(versionKey, data)
}
export function setTips(data) {
    return  data === true ? localStorage.setItem(tipsKey, 'on') : localStorage.setItem(tipsKey, 'off')
}
export function setAutotracker(data) {
    return localStorage.setItem(autotrackerKey, data)
}
export function setLanguage(data) {
    return localStorage.setItem(languageKey, data)
}