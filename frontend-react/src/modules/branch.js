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
            }).catch(error => {
                reject(error)
            })
        });
    }
}