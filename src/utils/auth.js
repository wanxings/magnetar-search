const TokenKey = 'Magnetar-Token'
const RememberKey = 'Magnetar-Remember'
const UserInfoKey = 'Magnetar-UserInfo'

// const UserIdKey = 'Admin-UserId'

export function getToken() {
    return localStorage.getItem(TokenKey)
}

export function setToken(token) {
    return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}

export function getRememberAccount() {
    let data = localStorage.getItem(RememberKey)
    return JSON.parse(data ? data : 'null')
}

export function setRememberAccount(data) {
    return localStorage.setItem(RememberKey, JSON.stringify(data))
}

export function removeRememberAccount() {
    return localStorage.removeItem(RememberKey)
}

export function getUserInfo() {
    return JSON.parse(localStorage.getItem(UserInfoKey))
}

export function setUserInfo(userinfo) {
    return localStorage.setItem(UserInfoKey, JSON.stringify(userinfo));
}

export function removeUserInfo() {
    return localStorage.removeItem(UserInfoKey)
}