import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    frame: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        marginTop: "5%",
        maxWidth: 345,
        backgroundColor: "primary"
      },
      media: {
        height: 330,
      },
  }));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.frame}>
        <Card variant="outlined" className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image="https://www.freepnglogos.com/uploads/bitcoin-png/bitcoinpaygate-bitcoin-payment-gateway-payment-processor-7.png"
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Bitcoin
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Le Bitcoin est une cryptomonnaie autrement appelée monnaie cryptographique.
            Dans le cas de la dénomination unitaire, on l'écrit « bitcoin » et,
            dans le cas du système de paiement pair-à-pair on l'écrit « Bitcoin ».
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" variant="outlined">
            Share
            </Button>
            <Button size="small" variant="outlined">
            Learn More
            </Button>
        </CardActions>
        </Card>
    </div>
  );
}
