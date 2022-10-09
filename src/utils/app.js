const versionKey = 'version'
const languageKey = 'language'
const darkmodeKey = 'darkmode'
const safeModeKey = 'safeMode'
const autotrackerKey = 'autotracker'
const searchEngineKey = 'searchEngine'
const searchPageComponentKey = 'searchPageComponent'
const tipsKey = 'tipsKey'
const javFilterFormKey = 'javFilterForm'
const javSearchFilterFormKey = 'javSearchFilterForm'
const javActressSearchFilterFormKey = 'javActressSearchFilterForm'
const javActressFilterFormKey = 'javActressFilterForm'
const btSearchFilterFormKey = 'btSearchFilterForm'
const btListFilterFormKey = 'btListFilterForm'
const movieSearchFilterFormKey = 'movieSearchFilterForm'
const movieListFilterFormKey = 'movieListFilterForm'

// const UserIdKey = 'Admin-UserId'

export function getDarkmode() {
    return localStorage.getItem(darkmodeKey)
}
export function getSafeMode() {
    return localStorage.getItem(safeModeKey)
}

export function getJavFilterForm() {
    return JSON.parse(localStorage.getItem(javFilterFormKey))
}
export function getJavSearchFilterForm() {
    return JSON.parse(localStorage.getItem(javSearchFilterFormKey))
}
export function getJavActressSearchFilterForm() {
    return JSON.parse(localStorage.getItem(javActressSearchFilterFormKey))
}
export function getJavActressFilterForm() {
    return JSON.parse(localStorage.getItem(javActressFilterFormKey))
}
export function getBtSearchFilterForm() {
    return JSON.parse(localStorage.getItem(btSearchFilterFormKey))
}
export function getBtListFilterForm() {
    return JSON.parse(localStorage.getItem(btListFilterFormKey))
}
export function getMovieSearchFilterForm() {
    return JSON.parse(localStorage.getItem(movieSearchFilterFormKey))
}
export function getMovieListFilterForm() {
    return JSON.parse(localStorage.getItem(movieListFilterFormKey))
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
export function setSafeMode(data) {
    return localStorage.setItem(safeModeKey, data)
}
export function setJavFilterForm(data) {
    return localStorage.setItem(javFilterFormKey, JSON.stringify(data));
}
export function setJavSearchFilterForm(data) {
    return localStorage.setItem(javSearchFilterFormKey, JSON.stringify(data));
}
export function setJavActressSearchFilterForm(data) {
    return localStorage.setItem(javActressSearchFilterFormKey, JSON.stringify(data));
}
export function setJavActressFilterForm(data) {
    return localStorage.setItem(javActressFilterFormKey, JSON.stringify(data));
}
export function setBtSearchFilterForm(data) {
    return localStorage.setItem(btSearchFilterFormKey, JSON.stringify(data));
}
export function setBtListFilterForm(data) {
    return localStorage.setItem(btListFilterFormKey, JSON.stringify(data));
}
export function setMovieSearchFilterForm(data) {
    return localStorage.setItem(movieSearchFilterFormKey, JSON.stringify(data));
}
export function setMovieListFilterForm(data) {
    return localStorage.setItem(movieListFilterFormKey, JSON.stringify(data));
}
export function setVersion(data) {
    return localStorage.setItem(versionKey, data)
}
export function setTips(data) {
    return data === true ? localStorage.setItem(tipsKey, 'on') : localStorage.setItem(tipsKey, 'off')
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