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