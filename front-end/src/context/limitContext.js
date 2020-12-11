import React, { useEffect, useState } from "react";

import { Api } from '../services/Api'

export const LimitContext = React.createContext();

export const LimitProvider = ({ children }) => {

  const limitData = {
    feedLimit: 0,
    cryptoLimit: 0,
  }

  const [limit, setLimit] = useState(limitData);

  useEffect(() => {
    const updateLimitContext = async () => {

            const response = await Api.getSettings()

            if (response.status === 200 && response.data) {
                const settings = response.data.settings
                setLimit(settings);
            }
    }

    if (limit.cryptoLimit === 0) {
        updateLimitContext();
    }
  })

  return (
    <LimitContext.Provider value={{ limit, setLimit }}>{children}</LimitContext.Provider>
  );
};