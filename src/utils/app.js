const versionKey = 'version'
const languageKey = 'language'
const darkmodeKey = 'darkmode'
const autotrackerKey = 'autotracker'
const searchEngineKey = 'searchEngine'
const searchPageComponentKey = 'searchPageComponent'
const tipsKey = 'tipsKey'
const javSelectFromKey = 'javSelectFrom'

// const UserIdKey = 'Admin-UserId'

export function getDarkmode() {
    return localStorage.getItem(darkmodeKey)
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
export function getSearchEngine() {
    return JSON.parse(localStorage.getItem(searchEngineKey))
}
export function getSearchPageComponent() {
    return JSON.parse(localStorage.getItem(searchPageComponentKey))
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
export function setSearchEngine(data) {
    return localStorage.setItem(searchEngineKey, JSON.stringify(data));
}
export function setSearchPageComponent(data) {
    return localStorage.setItem(searchPageComponentKey, JSON.stringify(data));
}
export function setLanguage(data) {
    return localStorage.setItem(languageKey, data)
}