import React, { useContext, useEffect, useState } from "react";

import { Api } from '../services/Api'
import { UserContext } from "./userContext";

export const LimitContext = React.createContext();

export const LimitProvider = ({ children }) => {

  const { user } = useContext(UserContext);

  const limitData = {
    limitArticle: undefined,
    limitCryptos: undefined,
  }

  const [limit, setLimit] = useState(limitData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {


    const updateLimitContext = async () => {

            const response = await Api.getSettings()

            if (response.status === 200 && response.data) {
                const settings = response.data.settings
                setLimit(settings);
            }
            setIsLoading(false)
    }

    if (isLoading)
        updateLimitContext();
  })

  return (
    <LimitContext.Provider value={{ limit, setLimit }}>{children}</LimitContext.Provider>
  );
};