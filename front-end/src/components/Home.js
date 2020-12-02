import React from "react"
import Navbar from "./Navbar"
import Card from "./Card"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const Home = () => {
    const useStyles = makeStyles({
        root: {
          flexGrow: 1,
        },
      });
    const [value, setValue] = React.useState(2);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
    return (
        
        <div>
            <Navbar/>
            <div style={{margin: 5, color: "blue"}}>
            <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Paper>
            </div>
            <Grid>
                <Card/>
            </Grid>
        </div>
    )
}

export default Home;