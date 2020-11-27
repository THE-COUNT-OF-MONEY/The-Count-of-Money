import React, { useEffect } from 'react';
import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
    }
})

const api = {
    get(url, config) {
        return axiosInstance.get(url, config)
    },
    post(url, data, config) {
        return axiosInstance.post(url, data, config)
    },
    put(url, data, config) {
        return axiosInstance.put(url, data, config)
    },
    delete(url) {
        return axiosInstance.delete(url)
    }
}

export function loginPost(userData){
    let dataJson = userData;

    // parse les paramètres

    // test requetes
    api.post('/users/login', dataJson)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log('error: ', error);
        });
}