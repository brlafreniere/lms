import Axios from "axios";

import LMS from "./lms";

// the "model"
export default class Book {
    static fetch = (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/books/" + id)).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        });
    }

    static fetchInventories = (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/book_inventories/" + id)).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error);
            })
        })
    }
}
