import Axios from "axios";

import LMS from "./lms";

export default class Branch {
    constructor(id) {
        this.id = id;
    }

    static all = () => {
        return new Promise((resolve, reject) => {
            Axios.get(LMS.api('/branches')).then(response => {
                let branches = response.data.map(jsonRecord => {
                    let branch = new Branch(jsonRecord.id);
                    Object.assign(branch, jsonRecord);
                    return branch;
                })
                resolve(branches);
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