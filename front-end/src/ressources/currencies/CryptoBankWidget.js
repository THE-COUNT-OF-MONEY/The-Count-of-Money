import {React, useContext} from "react"
import { useState, useEffect } from 'react';
import { Api } from "../../services/Api";
import Datatable from "../../components/DataTable";
import RemoveIcon from '@material-ui/icons/Remove';
import { UserContext } from "../../context/userContext";


export const CryptoBank = () => {
  
    const { user } = useContext(UserContext);
    const [cryptoBank, setCryptoBank] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // eslint-disable-next-line
    const [itemRemoved, setItemRemoved] = useState(false);

    function HandleRemoveButton(currencyId)
    {
        console.log('user Id : ', user.id)
        console.log('currency Id : ', currencyId)

        const removeData = async () => {
            const response = await Api.RemoveUserCurrency(user.id, currencyId);

            if (response.status === 200) {
                console.log("SUCCESS")
                setItemRemoved(true)
            }
        }
        removeData();
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
                    handleClick: HandleRemoveButton,
                    label: <RemoveIcon/>,
                },
            ],
            type: "buttons"
        }
    ]


    useEffect(() => {

        const parseCryptos = (cryptos) => {
            const array = [];

            // eslint-disable-next-line
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