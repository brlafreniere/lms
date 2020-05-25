import React from "react";
import Axios from "axios";

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
    }

    handleSubmit = (event, formFields, multipart = false, id) => {
        event.preventDefault();

        if (id) {
            formFields['id'] = id
        }

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

        if (id) {
            // put update
            Axios.put(`${process.env.REACT_APP_API_URL}/${this.props.plural}/${id}`, formData, config)
            .then(response => {
                this.setState({redirect: true})
            }).catch(error => {
                console.log(error)
            })
        } else {
            // create
            Axios.post(`${process.env.REACT_APP_API_URL}/${this.props.plural}`, formData, config)
            .then(response => {
                this.setState({redirect: true})
            }).catch(error => {
                console.log(error)
            })
        }
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