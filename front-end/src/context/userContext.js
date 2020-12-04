import React, { useEffect, useState } from "react";

import { Api } from '../services/Api'
import firebase from 'firebase'

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};