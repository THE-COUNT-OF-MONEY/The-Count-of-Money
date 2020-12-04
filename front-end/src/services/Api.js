//import React, { useEffect } from 'react';
import firebase from 'firebase';
import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(function (config) {
    config.headers.authorization = localStorage.getItem('token')
    return config;
  }, function (error) {
    return Promise.reject(error);
});
  
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
                    resolve(token);
                }).catch((error) => {
                    console.log('error: ', error.response);
                    resolve(false);
                });
        })            
    },
    
    getGoogleToken() {
        var provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider)
            .then(function(googleUser) {
                // const token = googleUser.token
                const token = googleUser.credential.idToken;

                return token;
                // redirect to dashboard
            })
            .catch(function(error){
                console.log(error)
            })
    },

    signInWithProvider(provider) {
        const url = '/users/auth/' + provider;

        return new Promise((resolve) => {
            apiRequest.get(url)
                .then((res) => {
                    resolve(res)
                }).catch((error) => {
                    resolve(false);
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
                    resolve(res);
                }).catch((error) => {
                    resolve(false);
                });
        })
    },

    putProfile(userData) {
        return new Promise((resolve) =>{
            apiRequest.put('/users/profile', userData)
                .then((res) => {
                    resolve('updated');
                    
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
    },

    logout() {
        return new Promise((resolve) =>{
            apiRequest.post('/users/logout')
                .then((res) => {
                    localStorage.setItem("token", null);
                    firebase.auth().signOut().then(function() {
                        resolve(true)
                    }).catch(function(error) {
                        resolve(error)
                    });

                }).catch((error) => {
                });
        })
    }
}