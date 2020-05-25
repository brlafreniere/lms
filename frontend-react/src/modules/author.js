import Axios from "axios"
import LMS from "./lms"

export class Author {
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
}