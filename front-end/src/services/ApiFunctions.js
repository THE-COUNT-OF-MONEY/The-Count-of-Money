//import React, { useEffect } from 'react';
import firebase from 'firebase';
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

    // parse les paramètres
    return new Promise((resolve) =>{
        api.post('/users/login', userData)
        .then((res) => {
            console.log('insideLogin')
            console.log(res)
            let token = res.data.content.token
            localStorage.setItem("token",token);
            resolve('logined');
            
        }).catch((error) => {
            console.log('error: ', error.response);
            resolve(error.response.data.message);
        });
    })            
}

export function RegisterPost(userData){
    // parse les paramètres
    console.log(userData)
    return new Promise((resolve) =>{
        api.post('/users/register', userData)
        .then((res) => {
            console.log(res)
            resolve('created');
            
        }).catch((error) => {
            resolve(error.response.data.message);
        });
    })
}

export function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(googleUser) {
            let idToken = googleUser.credential.idToken;

            api.get('/users/auth/google?token=' + idToken, {})
                .then((res) => {
                    // Authentified => redirect to next page
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        })
        .catch(function(error){
            console.log(error)
        })
}