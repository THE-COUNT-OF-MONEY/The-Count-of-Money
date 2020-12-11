import {React, useContext} from "react"
import { useState, useEffect } from 'react';
import { Api } from "../../services/Api";
import { UserContext } from "../../context/userContext";
import { makeStyles } from '@material-ui/core/styles';
import Datatable from "../../components/DataTable";
import RemoveIcon from '@material-ui/icons/Remove';

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
                label: <RemoveIcon/>,
            },
        ],
        type: "buttons"
    }
]

export const CryptoBank = () => {
  
    const { user } = useContext(UserContext);
    const [cryptoBank, setCryptoBank] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            
            if (user.id === undefined)
                return;

            const response = await Api.GetAllUserCryptos(user.id)
            const ParsedCrypto = parseCryptos(response)

            setCryptoBank(ParsedCrypto)
            setIsLoading(false);
        }

        if (isLoading === true)
            getData();
    }) 

    return (
        <div>
            <Datatable columns={columns} rows={cryptoBank}/>
        </div>
    )
}