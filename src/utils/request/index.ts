import axios from 'axios'

import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截器
request.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            // 后端提示错误
            if (res.code === 500) {
                ElMessage(res.message)
                return Promise.reject(res.message)
            }
            // 后端程序错误
            return Promise.reject('接口错误(X﹏X)')
        } else {
            return res
        }
    },
    error => {
        return Promise.reject(error)
    }
)


export default request