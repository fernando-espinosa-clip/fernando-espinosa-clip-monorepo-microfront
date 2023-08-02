import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

const secretKey = (cookieName = 'dev_access_token') => getCookie(cookieName) || 'ds87f6as87f68sd76fsbfbbfsd6f8764l5kk';

export const encryptStorage = (name, data) => {
    const encrypt = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        secretKey(),
    ).toString()

    localStorage.setItem(name, encrypt)
}

export const decryptStorage = (name) => {
    try {
        const encrypt = localStorage.getItem(name)
        const decrypt = CryptoJS.AES.decrypt(encrypt, secretKey()).toString(
            CryptoJS.enc.Utf8,
        )
        return JSON.parse(decrypt)
    } catch (e) {
        console.log('Te la pelaste')
    }

}

export const setCookie = (name, value) => Cookies.set(name, value);

export const getCookie = (name) => Cookies.get(name);

export const deleteCookie = (name) => Cookies.remove(name);

export default {
    encryptStorage,
    decryptStorage,
    setCookie,
    getCookie,
    deleteCookie,
}