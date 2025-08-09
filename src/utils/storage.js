import Cookies from "js-cookie"

export const storage = {
    storeInCookies: (key, value, expiry) => {
        Cookies.set(key, value, {expires: expiry})
    },

    getFromCookies: (key) => {
        return Cookies.get(key)
    },

    deleteFromCookies: (key) => {
        Cookies.remove(key, {path: ''})
    }
}