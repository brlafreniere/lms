import LMS from "./lms";

export default class User {
    static getCheckouts() {

    }

    static getMyAccountInfo(userId) {
        return new Promise((resolve, reject) => {
            LMS.api_call_v2(`/users/${userId}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        })
    }

    static getReservations(userId) {
        LMS.api_call_v2(`/user/${userId}/reservations`).then(response => {
            console.log(response)
        })
    }
}