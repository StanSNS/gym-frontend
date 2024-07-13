import {decryptData, encryptData} from "./SecurityService";

const setCookie = (name, value, hoursToExpire) => {
    const date = new Date();
    date.setTime(date.getTime() + hoursToExpire * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

const getCookie = (name) => {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
};


const DIALOG_WEB_TRAFFIC = 'gym_fit_dialog_accepted';

export const getWebTrafficCookie = () => {
    return decryptData(getCookie(DIALOG_WEB_TRAFFIC));
}

export const setWebTrafficCookie = () => {
    setCookie(DIALOG_WEB_TRAFFIC, encryptData('true'), 12);
}