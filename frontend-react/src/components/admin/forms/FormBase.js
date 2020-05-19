import React from "react";

export default class FormBase extends React.Component {
    handleFieldChange = (event) => {
        const { name, value, type } = event.target;        

        let file = null;
        if (type == "file") {
            file = event.target.files[0]; // only handling 1 file but that's okay
        }

        this.setState(prevState => {
            let formFields = Object.assign({}, prevState.formFields)
            if (type == "file") {
                formFields[name] = file
            } else {
                formFields[name] = value
            }
            return {formFields}
        })
    }
}