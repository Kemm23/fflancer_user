const SAVE_TOKEN_KEY = 'SAVE_TOKEN_KEY'
const USER_NAME = "userName"
const USER_EMAIL = "userEmail"
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get() {
        return JSON.parse(localStorage.getItem(SAVE_TOKEN_KEY)) || []
    },
    getUserName() {
        return JSON.parse(localStorage.getItem(USER_NAME)) || []
    },
    getUserEmail() {
        return JSON.parse(localStorage.getItem(USER_EMAIL)) || []
    },
    set(key, userName, userEmail) {
        localStorage.setItem(SAVE_TOKEN_KEY, JSON.stringify(key))
        localStorage.setItem(USER_NAME, JSON.stringify(userName))
        localStorage.setItem(USER_EMAIL, JSON.stringify(userEmail))
    },
    delete() {
        localStorage.clear()
    }
}