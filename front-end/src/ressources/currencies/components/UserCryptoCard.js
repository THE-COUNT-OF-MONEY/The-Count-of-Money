import React from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

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

export const UserCryptoCard = ({currency}) => {
    const classes = useStyles();

    let picture = currency.BaseImageUrl + currency.ImageUrl;

    return (
        <Card className={classes.root}>
                <CardHeader
                    title={currency.Name}
                />
                <CardMedia
                    className={classes.media}
                    component="img"
                    src={picture}
                    title="picture"
                />
                <CardContent  style={{maxHeight: 200, overflow: 'auto'}}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {currency.Description}
                    </Typography>                    
                </CardContent>

                <CardActions className={classes.actions}>
                    <Button variant={"contained"}
                            size={"small"}
                            color={"secondary"}
                        >
                        Remove
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