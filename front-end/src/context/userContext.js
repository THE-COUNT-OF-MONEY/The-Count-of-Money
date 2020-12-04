import React, { useEffect, useState } from "react";

import { Api } from '../services/Api'
import firebase from 'firebase'

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            Api.getProfile().then((res) => {
                if (res.status === 200) {
                    if (res.data !== undefined && res.data.content !== undefined) {
                        const userData = res.data.content.user;
                        console.log(userData)
                        setUser(userData)
                    }
                }
        
            });
        });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};