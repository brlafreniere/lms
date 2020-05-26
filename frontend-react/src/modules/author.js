import Axios from "axios"
import LMS from "./lms"

export default class Author {
    static all = () => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/authors")).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        });
    }

    static fetch = (id) => {

    }

    static submitAuthor = (author) => {
        return new Promise((resolve, reject) => {
            if (author.id) {
                let path = "/authors/" + author.id
                LMS.api_call(path, author, 'put').then(response => {
                    resolve(response)
                })
            } else {
                LMS.api_call("/authors/", author, 'post').then(response => {
                    resolve(response)
                })
            }
        })
    }
}