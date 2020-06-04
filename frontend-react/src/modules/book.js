import Axios from "axios";

import LMS from "./lms";

// the "model"
export default class Book {
    static fetch = (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/books/" + id)).then(response => {
                resolve(response.data);
            }).catch(reject)
        });
    }

    static fetchInventories = (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api("/book_inventories/" + id)).then(response => {
                resolve(response.data)
            }).catch(reject)
        })
    }

    static createReservation(payload) {
        return new Promise((resolve, reject) => {
            LMS.api_call_with_auth("/reservations", payload, Axios.post)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
    }

    static reservationStatus(payload) {
        return new Promise((resolve, reject) => {
            LMS.api_call_with_auth(`/books/${payload.book_id}/reservation-status`, {}, Axios.get)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
    }
}
