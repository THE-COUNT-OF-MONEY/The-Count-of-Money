//import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useState, useEffect, Dispatch } from 'react';
import axios from 'axios';

const corsUrl = "https://api.rss2json.com/v1/api.json?rss_url=";

const getFeedListing = url => axios.get(`${corsUrl}${url}`);


export const Rss = {
    getCryptos() {
        return getFeedListing("https://cryptoactu.com/feed")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log("error: ", error)
            })

    }
}


