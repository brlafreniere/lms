import Axios from "axios";

import LMS from "./lms";

export default class Branch {
    static all = () => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api('/branches')).then(response => {
                resolve(response.data)
            }).catch(reject)
        });
    }

    static submitBranch = (branch) => {
        console.log(branch)
        return new Promise((resolve, reject) => {
            if (branch.id) {
                let path = "/branches/" + branch.id
                LMS.api_call(path, branch, 'put').then(response => {
                    resolve(response)
                }).catch(console.log)
            } else {
                LMS.api_call("/branches/", branch, 'post').then(response => {
                    resolve(response)
                }).catch(console.log)
            }
        })
    }
}