import React from "react";
import Axios from "axios";

import {
    useParams,
    Redirect
} from "react-router-dom";

export function RecordFormWrapper(props) {
}

// can't use useParams in a class component for some reason...
export function EditRecordForm(props) {
    let {id} = useParams();
    return (
        {/*<RecordForm plural={props.plural} form={props.form} redirectCallback={props.redirectCallback} id={id} />*/}
    )
}

export default class FormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };
    }

    setupRedirect() {
        if (this.state.redirect) {
            this.props.redirectCallback();
        }
        return (
            <div>
                {this.state.redirect ? <Redirect to={`/admin/${this.props.plural}`} /> : null}
            </div>
        )
    }

    handleSubmit = (event, formFields, multipart = false, id) => {
        event.preventDefault();

        let formData = null;
        let config = null;
        if (multipart) {
            formData = new FormData();
            for (let [key, value] of Object.entries(formFields)) {
                formData.append(key, value)
            }
            config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        } else {
            formData = formFields;
        }

        Axios.post(`${process.env.REACT_APP_API_URL}/${this.props.plural}`, formData, config)
        .then(response => {
            this.setState({redirect: true})
        }).catch(error => {
            console.log(error)
        })
    }

    handleFieldChange = (event) => {
        const { name, value, type } = event.target;        

        let file = null;
        if (type === "file") {
            file = event.target.files[0]; // only handling 1 file but that's okay
        }

        this.setState(prevState => {
            let formFields = Object.assign({}, prevState.formFields)
            if (type === "file") {
                formFields[name] = file
            } else {
                formFields[name] = value
            }
            return {formFields}
        })
    }
}