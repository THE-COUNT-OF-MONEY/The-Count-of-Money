import {React, useContext} from "react"
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Api } from "../../services/Api";
import { UserContext } from "../../context/userContext";
import { makeStyles } from '@material-ui/core/styles';
import Datatable from "../../components/DataTable";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        textTransform: 'none',
        margin: theme.spacing(0.5)
    }
}))

const columns = [
    { id: 'image', label: 'Image', type: 'image' },
    { id: 'name', label: 'Name', type: 'string'},
    { id: 'symbol', label: 'Symbol', type: 'string' },
    { id: 'lowest', label: 'Lowest', type: 'string' },
    { id: 'highest', label: 'Highest', type: 'string' },
    { id: 'close', label: 'Close', type: 'string' },
    { id: 'actions', label: 'Actions', disableSorting: true,
        buttons: [
            {
                handleClick: undefined,
                label: <AddIcon></AddIcon>,
            },

        ],
        type: "buttons"
    }
]

export const CryptoBank = () => {
  
    const { user } = useContext(UserContext);
    const [cryptoBank, setCryptoBank] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            if(user.id != null)
            {
                console.log("user.id: ", user.id);
                const response = await Api.GetAllUserCryptos(user.id)
                if(response != null)
                {
                    console.log("response: ", response);
                    const ParsedCrypto = parseCryptos(response)
                    console.log("ParsedCrypto: ", ParsedCrypto);
                    setCryptoBank(ParsedCrypto)
                    setIsLoading(false);
                }                
            }else{
                getData()
            }
            
            // let response = [
            //     {
            //         "BaseImageUrl": "https://www.cryptocompare.com",
            //         "Description": "Bitcoin Dark (BTCD) is a PoW and PoS hybrid alternative cryptocurrency based on the same algorithm as Bitcoin itself - SHA256 - the difference is in the intent behind development - where Bitcoin is moving towards regulatory approval with increased transparency, BitcoinDark tries to push further of the belief of decentralization and anonymity. The block time is 60 seconds - there was a 1.5 premine and a total of 22 million coins are scheduled to be produced.Following the announcement of the Komodo Platform by the SuperNet team, BitcoinDark could be swapped for KMD coins and will be so until 2018. BTCD technology will be further advanced in the KMD platform.",
            //         "Id": null,
            //         "ImageUrl": "/media/19630/btcd_1.png",
            //         "Name": "BTCD",
            //         "id": "4400"
            //     },
            //     {
            //         "BaseImageUrl": "https://www.cryptocompare.com",
            //         "Description": "CraigCoin (CRAIG) is a 100% pure PoS or Proof of Stake alternative Crypto currency - the first 30,000,000 coins were issued through a presale. The block time is 30 seconds and the PoS interest rate is set to 2% per annum.",
            //         "Id": null,
            //         "ImageUrl": "/media/20022/craig.png",
            //         "Name": "CRAIG",
            //         "id": "4425"
            //     }
            // ]
            // setCryptoBank(response)
            // setIsLoading(false)
        }

        const parseCryptos = (cryptos) => {
            const array = [];

            for (const [key, crypto] of Object.entries(cryptos)) {
                let format = {
                    image: crypto.image,
                    name: crypto.name,
                    symbol: crypto.symbol,
                    highest: crypto.historic[0].high,
                    lowest: crypto.historic[0].low,
                    close: crypto.historic[0].close,
                    id: crypto.symbol
                }
                array.push(format);
            }

            return array;
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
            <Datatable columns={columns} rows={cryptoBank}/>
            {/* {
                // (cryptoBank !== undefined) && 
                //     <Grid container alignItems="flex-start" justify="flex-start" spacing={2}>
                //         {
                //             cryptoBank.map((currency, key) => {
                //                 return(
                //                     <Grid item xs={2} key={key} >
                //                         <Grid container justify="center">
                //                             <UserCryptoCard currency={currency}></UserCryptoCard>
                //                         </Grid>
                //                     </Grid>
                //                 )
                //             })
                //         }
                //     </Grid>
            } */}
        </div>
            
            
        
        // <div>
        //     {renderUserCryptos()}            
        // </div>
    )
}