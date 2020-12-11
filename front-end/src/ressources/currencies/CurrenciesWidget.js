import React, { useContext } from "react"
import { useState, useEffect } from 'react';
import { Api } from "../../services/Api";
import { makeStyles } from '@material-ui/core/styles';
import { LimitContext } from "../../context/limitContext";
import Datatable from "../../components/DataTable";
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from "../../context/userContext";

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

function HandleAddButton()
{
    const { user } = useContext(UserContext);
    console.log('user : ', user)


}


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
                handleClick: HandleAddButton,
                label: <AddIcon></AddIcon>,
            },

        ],
        type: "buttons"
    }
]

export const Currencies = () => {
  
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {limit} = useContext(LimitContext);

    useEffect(() => {

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

        const getData = async () => {
            let response = await Api.getCurrencies();
            const cryptos = parseCryptos(response.data.content.cryptos);

            setCurrencies(cryptos)
            setIsLoading(false)
        }

        if (isLoading === true) {
            getData();
        }
    })

    return (
       <div>
           <Datatable columns={columns} rows={currencies}/>
       </div>
    )
}