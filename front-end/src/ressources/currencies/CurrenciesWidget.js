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
            // let currencies = await Api.getCurrencies();

            let currencies = [
                {
                    "BaseImageUrl": "https://www.cryptocompare.com",
                    "Description": "Bitcoin Dark (BTCD) is a PoW and PoS hybrid alternative cryptocurrency based on the same algorithm as Bitcoin itself - SHA256 - the difference is in the intent behind development - where Bitcoin is moving towards regulatory approval with increased transparency, BitcoinDark tries to push further of the belief of decentralization and anonymity. The block time is 60 seconds - there was a 1.5 premine and a total of 22 million coins are scheduled to be produced.Following the announcement of the Komodo Platform by the SuperNet team, BitcoinDark could be swapped for KMD coins and will be so until 2018. BTCD technology will be further advanced in the KMD platform.",
                    "Id": null,
                    "ImageUrl": "/media/19630/btcd_1.png",
                    "Name": "BTCD",
                    "id": "4400"
                },
                {
                    "BaseImageUrl": "https://www.cryptocompare.com",
                    "Description": "CraigCoin (CRAIG) is a 100% pure PoS or Proof of Stake alternative Crypto currency - the first 30,000,000 coins were issued through a presale. The block time is 30 seconds and the PoS interest rate is set to 2% per annum.",
                    "Id": null,
                    "ImageUrl": "/media/20022/craig.png",
                    "Name": "CRAIG",
                    "id": "4425"
                }
            ]
            setIsLoading(false)
            setCurrencies(currencies)
        }

        if (isLoading === true)
            getData();
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