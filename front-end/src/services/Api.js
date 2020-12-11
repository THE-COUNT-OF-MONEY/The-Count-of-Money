// import { useContext } from 'react';
import firebase from '../firebase';
import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:8000",
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(function (config) {
    config.headers.authorization = localStorage.getItem('token')
    config.headers.csrfToken = localStorage.getItem('csrf')
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

    getCsrf () {
        const url = '/csrf';
        return new Promise((resolve) =>{
            apiRequest.get(url)
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    console.log("error", error);
                    resolve(undefined);
                });
        })
    },

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
                const token = googleUser.credential.idToken;
                return token;
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
                    console.log("error: ", error)
                    resolve(undefined);
                });
        })

    },

    register(userData) {
        return new Promise((resolve) =>{
            apiRequest.post('/users/register', userData)
                .then((res) => {
                    resolve('created');
                }).catch((error) => {
                    console.log("error: ", error)
                    resolve(undefined);
                });
        })
    },

    getCurrencies() {
        return new Promise((resolve) =>{
            apiRequest.get('/currencies')
                .then((res) => {                    
                    resolve(res);
                }).catch((error) => {
                    console.log("error: ", error)
                    resolve(undefined);
                });
        })
    },

    getOneCurrency(currencyID) {
        const url = '/currencies/' + currencyID
        return new Promise((resolve) =>{
            apiRequest.get(url)
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.log("error: ", error)
                    resolve(undefined);
                });
        })
    },

    getProfile() {
        return new Promise((resolve) =>{
            apiRequest.get('/users/profile')
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    console.log("error: ", error)
                    resolve(false);
                });
        })
    },

    putProfile(userData) {

        console.log("user: ", userData)
        return new Promise((resolve) =>{
            apiRequest.put('/users/profile', userData)
                .then((res) => {
                    resolve(true);
                }).catch((error) => {
                    console.log("error: ", error);
                    resolve(undefined);
                });
        })
    },

    getUsers() {
        return new Promise((resolve) =>{
            apiRequest.get('/users')
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    console.log("error: ", error);
                    resolve(undefined);
                });
        })
    },

    getSettings() {
        const url = '/settings';
        return new Promise((resolve) =>{
            apiRequest.get(url)
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    console.log("error: ", error);
                    resolve(undefined)
                });
        })
    },

    updateSettings(data) {
        const url = '/settings';

        return new Promise((resolve) =>{
            apiRequest.put(url, data)
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    console.log("error: ", error);
                    resolve(undefined);
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
                        console.log("error: ", error);
                        resolve(undefined);
                    });
                }).catch((error) => {
                });
        })
    },

    GetAllUserCryptos(userID) {
        const url = '/users/' + userID + '/currencies'
        return new Promise((resolve) =>{
            apiRequest.get(url)
                .then((res) => {   
                    resolve(res.data.content.cryptos)
                }).catch((error) => {
                    console.log("error: ", error);
                    resolve(undefined);
                });
        })
    },

    AddUserCurrency(userID, CurrencyID) {
        const url = '/users/'+ userID + '/currencies/' + CurrencyID
        return new Promise((resolve) =>{
            apiRequest.put(url)
                .then((res) => {
                    resolve(true);
                }).catch((error) => {
                    resolve(false)
                });
        })
    },

    RemoveUserCurrency(userID, CurrencyID) {
        const url = '/users/'+ userID + '/currencies/' + CurrencyID
        return new Promise((resolve) =>{
            apiRequest.delete(url)
                .then((res) => {
                    resolve(true)
                }).catch((error) => {
                    resolve(false)
                });
        })
    },
}