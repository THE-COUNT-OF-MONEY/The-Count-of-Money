import React, { useState, useEffect } from 'react'
import UserForm from "./components/UserForm";
//import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "./components/useTable";
//import * as employeeService from "../../services/employeeService";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "./components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import { Button} from "@material-ui/core";
import { Api } from "../../services/Api";

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


const headCells = [
    { id: 'firstname', label: 'First Name' },
    { id: 'lastname', label: 'Last Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'role', label: 'Role' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Users() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")

    const {
        TblContainer,
        TblHead,
    } = useTable(records, headCells, filterFn);

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            //employeeService.insertEmployee(employee)
            console.log('test');
        else
            //employeeService.updateEmployee(employee)
            console.log('test');
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        //setRecords(employeeService.getAllEmployees())
    }

    useEffect(() => {

        const getData = async () => {
            const res = await Api.getUsers();

            if (res.status === 200) {
                const users = res.data.content.users;
                setUsers(users);
            }
        
            setIsLoading(false)
        }

        if (isLoading === true)
            getData();
    })

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <div>
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <TextField
                        label="Search Users"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={(e) => { setSearch(e.target.value)}}
                        value={search}
                    />
                    <Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    >
                        Add User
                    </Button>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            users.filter((value) => {
                                if (search == "")
                                    return value;
                                else if (value.email.toLowerCase().includes(search.toLowerCase()))
                                    return value;
                                return;
                            }).map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.firstname}</TableCell>
                                    <TableCell>{item.lastname}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.role}</TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Button>
                                        <Button
                                            color="secondary">
                                            <CloseIcon fontSize="small" />
                                        </Button>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
            <Popup
                title="Create User"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </div>
    )
}
