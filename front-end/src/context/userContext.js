import React, { useEffect, useState } from "react";

import { Api } from '../services/Api'
import firebase from 'firebase'

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

  const userData = {
    firstname: "",
    lastname: "",
    email: "",
    role: ""
  }

  const [user, setUser] = useState(userData);

  useEffect(() => {
    const updateUserContext = async () => {
      const response = await Api.getProfile();
  
      if (response.status === 200 && response.data && response.data.content) {
        setUser(response.data.content.user);
      }
    }

    if (localStorage.token && userData.role === "")
      updateUserContext();
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};