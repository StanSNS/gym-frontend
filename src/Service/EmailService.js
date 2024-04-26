import axios from "axios";
import {BACKEND_BASE_URL} from "../Constant/globalConst";

export const sendRequestEmail = (email, title, content) => {
    return axios.post(BACKEND_BASE_URL + `/sendEmail?email=${email}&title=${title}&content=${content}`).then((response) => {
        return response;
    })
};