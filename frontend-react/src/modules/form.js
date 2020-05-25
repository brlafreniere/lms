export default class Form {
    static handleInputChange(event) {
        const { name, value, type } = event.target;        

        let file = null;
        let fieldValue = null;
        if (type === "file") {
            file = event.target.files[0]; // only handling 1 file but that's okay
            fieldValue = file;
        } else {
            fieldValue = value;
        }

        this.setState(prevState => {
            let newState = Object.assign({}, prevState)
            newState.book[name] = fieldValue;
            return newState;
        })
    }

    static makeFormData = (obj) => {
        let formData = new FormData();
        for (let [key, value] of Object.entries(obj)) {
            formData.append(key, value)
        }
        return formData;
    }
    
    static multipartConfig = () => {
        return {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }
}