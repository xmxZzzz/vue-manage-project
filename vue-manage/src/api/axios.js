// 二次封装axios 拦截器

import axios from 'axios'
import config from '../config/index'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequst {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            header: {}
        }
        return config
    }

    //拦截器
    interceptors(instance) {
        //添加请求拦截器
        instance.interceptors.request.use(function (config) {
            //在发送请求之前做些什么
            console.log('拦截处理请求');
            return config;
        }, function (error) {
            //对请求错误做些什么
            return Promise.reject(error);
        });
        //添加响应拦截器
        instance.interceptors.response.use(function (response) {
            //对响应数据做些什么
            console.log('处理响应');
            return response
        }, function (error) {
            //对响应错误做些什么
            return Promise.reject(error)
        });
    }
    request(options) {
        const instance = axios.create();
        options = { ...this.getInsideConfig(), ...options }
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequst(baseUrl)
