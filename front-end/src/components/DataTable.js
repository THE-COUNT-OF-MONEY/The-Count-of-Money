import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Avatar } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import { TextField } from '@material-ui/core';
import { Button} from "@material-ui/core";
import useTable from "./useTable";


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

export const DataTable = ({columns, rows}) => {
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
    } = useTable(rows, columns, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.firstname.toLowerCase().includes(target.value))
            }
        })
    }


    const getButtons = (buttons) => {

        const elements = [];
        
        buttons.forEach((button, key) => {
            elements.push(<Button key={key}>{button.label}</Button>)
        })

        return (
            <div>
                {
                    elements.map((element) => {
                        return element;
                    })
                }
            </div>
        )
    }

    const Cell = ({item, column}) => {

        const type = column.type
        const columnId = column.id;
        let element = <div>{item[columnId]}</div>


        if (type === "image") {
            element = <Avatar src={item[columnId]}></Avatar>
        }

        if (type === "buttons" && column.buttons) {
            element = getButtons(column.buttons)
        }

        return (
            <TableCell>
                {element}
            </TableCell>
        )
    }

    const SearchBar = () => {
        return (
            <Toolbar>
                <TextField
                    label="Search Crypto"
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
            </Toolbar>
        )
    }

    const CustomTable = () => {
        return (
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        rows.map((item, key) =>
                            <TableRow key={item.id}>
                            {
                                columns.map(column => {
                                    return (
                                        <Cell
                                            key={item.id + column.id}
                                            item={item}
                                            column={column}
                                        />
                                    )
                                })
                            }
                            </TableRow>
                        )
                    }
                </TableBody>
            </TblContainer>
        )
    }

    return (
        <Paper className={classes.pageContent}>
            <SearchBar/>
            <CustomTable/>
        </Paper>
    )

}

export default DataTable;