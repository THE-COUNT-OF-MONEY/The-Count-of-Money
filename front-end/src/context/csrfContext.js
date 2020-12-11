import React, { useEffect, useState } from "react";

import { Api } from '../services/Api'

export const CsrfContext = React.createContext();

export const CsrfProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true)
  // useEffect(() => {

  //   const getCsrf = async () => {
  //     const response = await Api.getCsrf();
  //     const csrf = response.data.content.csrfToken;
  //     localStorage.setItem('csrf', csrf);
  //     console.log("csrf: ", csrf);
  //     setIsLoading(false)
  //   }

  //   if (isLoading === true) {
  //     getCsrf();
  //   }
  // })

  return (
    <CsrfContext.Provider value={{}}>{children}</CsrfContext.Provider>
  );
};