import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import { useForm, Form } from './Form';
import { TextField } from '@material-ui/core';
import { Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        alignContent: 'center'
    },
    label: {
        textTransform: 'none'
    }
}))

const initialFValues = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    role: ''
}

export default function UserForm(props) {
    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstname' in fieldValues)
            temp.firstname = fieldValues.firstname ? "" : "This field is required."
        if ('LastName' in fieldValues)
            temp.lastname = fieldValues.lastname ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? "" : "Minimum 6 letters required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name="firstname"
                        label="First Name"
                        value={values.firstname}
                        onChange={handleInputChange}
                        error={errors.firstname}
                    />
                    <TextField
                        name="lastname"
                        label="Last Name"
                        value={values.lastname}
                        onChange={handleInputChange}
                        error={errors.lastname}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <TextField
                        label="Role"
                        name="role"
                        value={values.role}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Button
                            type="submit"
                            text="Submit"
                            variant={"contained"}
                            size={"large"}
                            color={"primary"}
                            onClick={handleSubmit}
                            classes={{ root: classes.root, label: classes.label }}
                        >Submit
                        </Button>
                        <Button                            
                            color="default"
                            variant={"contained"}
                            size={"large"}
                            onClick={resetForm} 
                            classes={{ root: classes.root, label: classes.label }}
                        >Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
