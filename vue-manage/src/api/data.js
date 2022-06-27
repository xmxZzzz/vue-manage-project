import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        url: '/permisson/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}
export const createUser = (param) => {
    return axios.request({
        url: '/user/add',
        method: 'post',
        data: param
    })
}

export const updateUser = (param) => {
    return axios.request({
        url: '/user/edit',
        method: 'post',
        data: param
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}