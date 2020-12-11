import React, { useEffect, useState } from "react";

import { Api } from '../services/Api'

export const CsrfContext = React.createContext();

export const CsrfProvider = ({ children }) => {

  useEffect(() => {

    const getCsrf = async () => {
      const response = await Api.getCsrf();
      const csrf = response.data.content.csrfToken;
      localStorage.setItem('csrf', csrf);
    }

    if (localStorage.getItem('csrf') === undefined) {
        getCsrf();
    }
  })

  return (
    <CsrfContext.Provider value={{}}>{children}</CsrfContext.Provider>
  );
};