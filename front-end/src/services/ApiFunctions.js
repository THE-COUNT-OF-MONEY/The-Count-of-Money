import React, { useEffect } from 'react';
import axios from 'axios';

//const apiBaseUrl = 'http://locahost:8000';

export function loginPost(userData){
    let dataJson = JSON.stringify(userData);
    console.log(dataJson);
    // return new Promise((resolve, reject) =>{
    //     fetch(apiBaseUrl+'/users/login', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "text/plain"
    //         },
    //         body: JSON.stringify(userData)
    //     })
    //     .then((response) =>{
    //         console.log(response.json());
    //         return response.json();
    //     })
    // })
    // fetch(apiBaseUrl+'/users/login', {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "text/plain"
    //     },
    //     body: JSON.stringify(userData)
    // })
    // .then(res => res.json())
    // .then(response => console.log('Success: ', response))
    // .catch(error => console.error('Error: ', error));

    //    React.useEffect(() =>{
    //         axios.post('/users/login', {dataJson},
    //     {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json'
    //     },
    //     {withCredentials: true})
    //         .then((res) => {
    //             console.log(res.data)
    //         }).catch((error) => {
    //             console.log('insideError');
    //             console.log(error.config)
    //             console.log(error.status)
    //             console.log(error.code)
    //         });
    //     })

    axios.post('http://locahost:8000/users/login', {dataJson},
        {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        {withCredentials: true})
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log('insideError');
                console.log(error.config)
                console.log(error.status)
                console.log(error.code)
            });
 
}