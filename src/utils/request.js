import axios from 'axios'
// import {Message} from 'element-ui'
// import store from '@/store'
import {getToken} from '@/utils/auth'
import Cookies from 'js-cookie'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    // if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = getToken()
    // }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
    if(response.data.code === -1) {
        console.log(window.location);
        Cookies.remove();
        window.location.href = window.location.origin;
    }
    return response;
}, error => {
    return Promise.reject(error);
})
export default service
