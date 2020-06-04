import Axios from "axios"
import LMS from "./lms"

export default class Author {
    static all = () => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api_url("/authors")).then(response => {
                resolve(response.data)
            }).catch(reject)
        });
    }

    static submitAuthor = (author) => {
        return new Promise((resolve, reject) => {
            let path = author.id ? "/authors/" + author.id : "/authors"
            let func = author.id ? Axios.put : Axios.post
            let args = {path, payload: author, func}
            LMS.api_call_v3(args)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
    }
}