import React from "react"
import Navbar from "./Navbar"
import Card from "./Card"
import Grid from '@material-ui/core/Grid'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Grid>
                <Card/>
            </Grid>
        </div>
    )
}

export default Home;