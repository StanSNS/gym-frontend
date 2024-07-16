import CryptoJS from 'crypto-js';
import {SUPER_SECRET_ENCRYPT_KEY} from "../Constant/globalConst";

export const encryptData = (data) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SUPER_SECRET_ENCRYPT_KEY).toString();
    } catch (error) {
        console.error('Encryption Error:', error);
    }
}

export const decryptData = (data) => {
    if (data) {
        const bytes = CryptoJS.AES.decrypt(data, SUPER_SECRET_ENCRYPT_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    }
}
