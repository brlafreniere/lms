export default class LMS {
    static api(path) {
        return `${process.env.REACT_APP_API_URL}${path}`
    }
}