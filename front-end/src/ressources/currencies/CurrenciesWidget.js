import React, { useContext } from "react"
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import { Api } from "../../services/Api";
import { CurrencyCard } from './components/CurrenciesCard'
import { LimitContext } from "../../context/limitContext";

export const Currencies = () => {
  
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {limit} = useContext(LimitContext);

    useEffect(() => {

        const getData = async () => {
            let response = await Api.getCurrencies();
            const cryptos = response.data.content.cryptos;

            setCurrencies(cryptos)
            setIsLoading(false)
        }

        if (isLoading === true) {
            getData();
        }
    })

    return (
        <div>
            <Grid container alignItems="flex-start" justify="flex-start" spacing={2}>
                {
                    currencies.map((currency, key) => {
                        if (limit.cryptoLimit && key < limit.cryptoLimit)
                            return(
                                <Grid item xs={2} key={key} >
                                    <Grid container justify="center">
                                        <CurrencyCard currency={currency}></CurrencyCard>
                                    </Grid>
                                </Grid>
                            )
                    })
                }
            </Grid>
        </div>
    )
}