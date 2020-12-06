import {React, useContext} from "react"
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Api } from "../../services/Api";
import { UserCryptoCard } from './components/UserCryptoCard'
import { UserContext } from "../../context/userContext";

export const CryptoBank = () => {
  
    const { user } = useContext(UserContext);
    const [cryptoBank, setCryptoBank] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            console.log("user.id: ", user.id);
            Api.GetAllUserCryptos(user.id).then((response) =>{
            console.log("response: ", response);
            setCryptoBank(response)
            setIsLoading(false)
            console.log("cryptoBank: ", cryptoBank);
            })            
        }

        if (isLoading === true) {
            getData();
        }
    }) 
    
    // function renderUserCryptos(){
    //     if (cryptoBank != null)
    //     {
    //         return (
    //             <div>
    //                 <Grid container alignItems="flex-start" justify="flex-start" spacing={2}>
    //                     {
    //                         cryptoBank.map((currency, key) => {
    //                             return(
    //                                 <Grid item xs={2} key={key} >
    //                                     <Grid container justify="center">
    //                                         <UserCryptoCard currency={currency}></UserCryptoCard>
    //                                     </Grid>
    //                                 </Grid>
    //                             )
    //                         })
    //                     }
    //                 </Grid>            
    //             </div>
    //         )
    //     }else
    //     {
    //         return (
    //             <div>
    //                 <Alert severity="warning">You haven't added any Crypto Currency in your account!</Alert>            
    //             </div>
    //         )
    //     }
    // }

    return (
        <div>
            {
                (cryptoBank !== undefined) && 
                    <Grid container alignItems="flex-start" justify="flex-start" spacing={2}>
                        {
                            cryptoBank.map((currency, key) => {
                                return(
                                    <Grid item xs={2} key={key} >
                                        <Grid container justify="center">
                                            <UserCryptoCard currency={currency}></UserCryptoCard>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
            }
        </div>
            
            
        
        // <div>
        //     {renderUserCryptos()}            
        // </div>
    )
}