import React from "react"
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import { Api } from "../../services/Api";
import { CurrencyCard } from './components/CurrenciesCard'

export const Currencies = () => {
  
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getData = async () => {
            let response = await Api.getCurrencies();
            setCurrencies(response.data)
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