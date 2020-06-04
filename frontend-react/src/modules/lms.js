import Axios from "axios";
import Cookies from "js-cookie";

import Form from "./form";

export default class LMS {
    static api_url(path) {
        return `${process.env.REACT_APP_API_URL}${path}`
    }

    static api_call_v3(args) {
        let config = {
            headers: {
                "Authorization": Cookies.get('auth-token')
            }
        }

        if (args.multipart) {
            args.payload = Form.makeFormData(args.payload)
            config.headers['Content-Type'] = 'multipart/form-data'
        }

        return new Promise((resolve, reject) => {
            let url = LMS.api_url(args.path)
            if (args.func === Axios.get || 
                args.func === Axios.delete || 
                args.func === Axios.head ||
                args.func === Axios.options)
            {
                // no payload
                args.func(url, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
            } else {
                args.func(url, args.payload, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
            }
        })
    }

    static api_call_v2(path, payload = {}, func = Axios.get, multipart = false) {
        let config = {
            headers: {
                "Authorization": Cookies.get('auth-token')
            }
        }

        if (multipart) {
            payload = Form.makeFormData(payload)
            config.headers['Content-Type'] = 'multipart/form-data'
        }

        return new Promise((resolve, reject) => {
            let url = LMS.api_url(path)
            if (func === Axios.get || 
                func === Axios.delete || 
                func === Axios.head ||
                func === Axios.options)
            {
                // no payload
                func(url, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
            } else {
                func(url, payload, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
            }
        })
    }

    static api_call_with_auth(path, payload, func) {
        let headers = {
            headers: {
                Authorization: Cookies.get('auth-token')
            }
        }
        return new Promise((resolve, reject) => {
            func(LMS.api_url(path), payload, headers)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
    }

    static api_call_multipart(path, obj, method, multipart) {
        return new Promise((resolve, reject) => {
            let formData = Form.makeFormData(obj)
            let config = null;
            if (multipart) {
                config = Form.multipartConfig()
            }

            if (method === 'put') {
                Axios.put(LMS.api_url(path), formData, config).then(response => {
                    resolve(response)
                }).catch(reject)
            }

            if (method === 'post') {
                Axios.post(LMS.api_url(path), formData, config).then(response => {
                    resolve(response)
                }).catch(reject)
            }
        })
    }
}