import React from "react";
import Axios from "axios";

import {
    useParams, 
    Redirect,
    Link
} from "react-router-dom";

import LMS from "./lms";
import Form from "./form"
import { AuthorSelectField } from "./author";
import BookDetailAdmin from "../components/book/BookDetailAdmin";

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
