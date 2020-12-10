import {React, useContext} from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { UserContext } from "../../../context/userContext";
import { Api } from "../../../services/Api";

const useStyles = makeStyles({
    root: {
        height: 600,
        justifyContent: 'center',
    },
    actions :{
        display: 'flex',
        justifyContent: 'center',
      }
});

export const CurrencyCard = ({currency}) => {
    const { user } = useContext(UserContext);
    const classes = useStyles();

    function handleAddCurrency(){
        if(user.id != null && currency.id != null)
        {
            console.log(user.id)
            console.log(currency.id)
            Api.AddUserCurrency(user.id, currency.id).then((result) =>{
                console.log(result)
            })
        }        
    }

    return (
        <Card className={classes.root}>
                <CardHeader
                    title={currency.name}
                />
                <CardMedia
                    className={classes.media}
                    component="img"
                    src={currency.image}
                    title="picture"
                />
                <CardContent  style={{maxHeight: 200, overflow: 'auto'}}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {currency.description}
                    </Typography>                    
                </CardContent>

                <CardActions className={classes.actions}>
                    <Button variant={"contained"}
                            size={"small"}
                            color={"primary"}
                            onClick={handleAddCurrency}
                        >
                        Add
                    </Button>
                    <Button color="default"
                            variant={"contained"}
                            size={"small"}>
                        Learn More
                    </Button>
                </CardActions>            
        </Card>
    );
}