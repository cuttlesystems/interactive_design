import axios from 'axios';

const BASE_URL = 'api/'

 const withOutToken = axios.create({
    baseURL: BASE_URL
})


export const withToken = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})


export default withOutToken