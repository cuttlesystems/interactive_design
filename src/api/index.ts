import axios from 'axios';

const BASE_URL = 'https://leonraize.university/api/v2/'

export default axios.create({
    baseURL: BASE_URL
})

export const withToken = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})