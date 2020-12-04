//import React, { useEffect } from 'react';
import firebase from 'firebase';
import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
        'authorization': ''
    }
})

const apiRequest = {
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

export const Api = {
    login(userData) {

        return new Promise((resolve) => {
            apiRequest.post('/users/login', userData)
                .then((res) => {
                    let token = res.data.content.token;
                    localStorage.setItem("token", token);
                    
                    axiosInstance.headers = {
                        'Content-Type': 'application/json',
                        'authorization': token
                    }
                    
                    resolve(true);
                }).catch((error) => {
                    console.log('error: ', error.response);
                    resolve(error.response.data.message);
                });
        })            
    },
    
    register(userData) {
        return new Promise((resolve) =>{
            apiRequest.post('/users/register', userData)
                .then((res) => {
                    resolve('created');
                    
                }).catch((error) => {
                    resolve(error.response.data.message);
                });
        })
    },
    
    signInWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(function(googleUser) {
                // redirect to dashboard
            })
            .catch(function(error){
                console.log(error)
            })
    },

    getCurrencies() {
        return new Promise((resolve) =>{
            apiRequest.get('/currency/getAllCrypto')
                .then((res) => {
                    console.log(res)
                }).catch((error) => {
                    resolve(error.response.data.message);
                });
        })
    },

    getProfile() {
        return new Promise((resolve) =>{
            apiRequest.get('/users/profile')
                .then((res) => {
                    console.log(res)
                }).catch((error) => {
                    resolve(error.response.data.message);
                });
        })
    },

    getUsers() {
        return new Promise((resolve) =>{
            apiRequest.get('/users')
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    resolve(error.response.data.message);
                });
        })
    }
}