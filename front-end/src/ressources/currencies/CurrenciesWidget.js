import React, { useContext } from "react"
import { useState, useEffect } from 'react';
import { Api } from "../../services/Api";
import { LimitContext } from "../../context/limitContext";
import Datatable from "../../components/DataTable";
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from "../../context/userContext";
import Alert from '@material-ui/lab/Alert';


export const Currencies = () => {
  
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {limit} = useContext(LimitContext);
    const {user} = useContext(UserContext);
    const [alert, setAlert] = useState(undefined)

    function HandleAddButton(currencyId)
    {
        const addData = async () => {
            const response = await Api.AddUserCurrency(user.id, currencyId);

            if (response) {
                setAlert({'message': 'Crypto successfully added.', status: 'success'})
            } else {
                setAlert({'message': "Crypto can't be added.", status: 'error'})
            }
        }
        addData();
    }

    const columns = [
        { id: 'image', label: 'Image', type: 'image' },
        { id: 'name', label: 'Name', type: 'string'},
        { id: 'symbol', label: 'Symbol', type: 'string' },
        { id: 'lowest', label: 'Lowest', type: 'string' },
        { id: 'highest', label: 'Highest', type: 'string' },
        { id: 'close', label: 'Close', type: 'string' },
    ]

    if (user.id !== undefined) {
        const buttons = {
            id: 'actions',
            label: 'Actions',
            disableSorting: true,
            buttons: [
                {
                    handleClick: HandleAddButton,
                    label: <AddIcon></AddIcon>,
                },
            ],
            type: "buttons"
        }
        columns.push(buttons)
    }

    useEffect(() => {

        const parseCryptos = (cryptos) => {
            const array = []
            const max = limit.cryptoLimit
            let count = 0

            // eslint-disable-next-line
            for (const [key, crypto] of Object.entries(cryptos)) {
                if (count < max) {
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
                count += 1;
            }

            return array;
        }

        const getData = async () => {
            let response = await Api.getCurrencies();
            const cryptos = parseCryptos(response.data.content.cryptos);

            setCurrencies(cryptos)
            setIsLoading(false)
        }

        if (limit.cryptoLimit !== 0 && isLoading === true) {
            getData();
        }
    })

    return (
        <div>
            {
                alert !== undefined && 
                <Alert severity={alert.status}>{alert.message}</Alert>
            }
            <Datatable columns={columns} rows={currencies} />
        </div>
    )
}