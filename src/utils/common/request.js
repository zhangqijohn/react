import axios from 'axios'
import {message} from 'antd'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 50000,
})

service.interceptors.response.use(
    response => {
        if (response.status !== 200 || (response.code && response.code.toString() !== '0')) {
            return Promise.reject(response)
        } else {
            return response.data
        }
    },
    error => {
        if (error.response.status === 401) {
            var url = ''
            if (typeof error.response.data.message !== 'undefined') {
                url = error.response.data.message
            } else {
                url = error.response.data
            }
            window.location.href = url + window.location.href
        } else {
            message.error(error.response.data.message)
        }

        return Promise.reject(error)
    },
)

export default service
