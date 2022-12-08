const FFLANCE_TOKEN = 'fflance_token'
const FFLANCE_DATA = "ffance_data"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getToken() {
        return JSON.parse(localStorage.getItem(FFLANCE_TOKEN)) 
    },
    getData() {
        return JSON.parse(localStorage.getItem(FFLANCE_DATA))
    },
    setToken(token) {
        localStorage.setItem(FFLANCE_TOKEN, JSON.stringify(token))
    },
    setData(data) {
        localStorage.setItem(FFLANCE_DATA, JSON.stringify(data))
    },
    delete() {
        localStorage.clear()
    }
}