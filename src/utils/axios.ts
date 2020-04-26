import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
    timeout: 50000
})

request.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        //TODO 需要与NODE层约定好code和命名格式
        const errorMsg = error.response.data.message || '请求失败，服务器异常';

        message.error(errorMsg, 5);
        return  Promise.reject(error);
    }
);

export default request;
