import Axios from "axios";
import Cookies from "js-cookie";

import Form from "./form";

export default class LMS {
    static api(path) {
        return `${process.env.REACT_APP_API_URL}${path}`
    }

    static api_call_with_auth(path, payload, func) {
        let headers = {
            headers: {
                Authorization: Cookies.get('auth-token')
            }
        }
        return new Promise((resolve, reject) => {
            func(LMS.api(path), payload, headers)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
    }

    static api_call(path, obj, method, multipart) {
        return new Promise((resolve, reject) => {
            let formData = Form.makeFormData(obj)
            let config = null;
            if (multipart) {
                config = Form.multipartConfig()
            }

            if (method === 'put') {
                Axios.put(LMS.api(path), formData, config).then(response => {
                    resolve(response)
                }).catch(reject)
            }

            if (method === 'post') {
                Axios.post(LMS.api(path), formData, config).then(response => {
                    resolve(response)
                }).catch(reject)
            }
        })
    }
}