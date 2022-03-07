import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3086'
})

export { api }
