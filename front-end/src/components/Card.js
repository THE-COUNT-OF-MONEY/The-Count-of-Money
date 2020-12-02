// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//     frame: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     root: {
//         marginTop: "5%",
//         width: 460,
//         height:645,
//         backgroundColor: "primary"
//       },
//       media: {
//         height: 330,
//       },
//   }));

// export default function MediaCard() {
//   const classes = useStyles();

//   const baseUrl = "https://www.cryptocompare.com/"
//   const response = {
//     'content': {
//         'Cryptos': [
//             {
//                 "Acronym": "BTC",
//                 "Id": "4321",
//                 "Url": "/coins/42/overview",
//                 "ImageUrl": "/media/35650717/42.jpg",
//                 "ContentCreatedOn": 1427211129,
//                 "Name": "42",
//                 "Symbol": "42",
//                 "CoinName": "42 Coin",
//                 "FullName": "42 Coin (42)",
//                 "Description": "Everything about 42 coin is 42 - apart from the transaction fees and difficulty retargetting - 0.00000001 and 7.5mins. A scrypt coin with 42 coins max, a 42 second block time, with superblocks giving 10 times the standard block reward of 0.0000420 42&#39;s.42 coin is a cryptocurrency with completed emission, fair distribution (no ICO, premine or instamine) and both private and public transaction support. The maximum supply of 42 coins makes the remaining 41.99 extremely rare. The innovative deflationary model provides a constant rise in incentives both for miners and long term investors. 42-coin delivers a hybrid of Proof-of-Work and Proof-of-Stake transaction confirmation methods and represents a new way of securing the network against 51% attacks.",
//             },
//             {
//               "Acronym": "ADT",
//               "Id": "188858",
//               "Url": "/coins/adt/overview",
//               "ImageUrl": "/media/1383829/adt.png",
//               "ContentCreatedOn": 1500492928,
//               "Name": "ADT",
//               "Symbol": "ADT",
//               "CoinName": "AdToken",
//               "FullName": "AdToken (ADT)",
//               "Description": "AdChain is an Ethereum-based digital advertisement platform that aims to fix  the fraudulent environment of online advertising namely bot traffic, malvertisements, trackers, spoofed domains, lack of coordination and systemic fraud. ADT is an ERC20 token that is used in order to ver publishers who wish to join the system, employing a \"challenge period\" during which any ADT holder who believes the publisher is fraudulent can issue a challenge and match the publisher&#39;s ADT deposit.  ",
//           },
//           {
//               "Acronym": "BTC",
//               "Id": "4321",
//               "Url": "/coins/42/overview",
//               "ImageUrl": "/media/35650717/42.jpg",
//               "ContentCreatedOn": 1427211129,
//               "Name": "42",
//               "Symbol": "42",
//               "CoinName": "42 Coin",
//               "FullName": "42 Coin (42)",
//               "Description": "Everything about 42 coin is 42 - apart from the transaction fees and difficulty retargetting - 0.00000001 and 7.5mins. A scrypt coin with 42 coins max, a 42 second block time, with superblocks giving 10 times the standard block reward of 0.0000420 42&#39;s.42 coin is a cryptocurrency with completed emission, fair distribution (no ICO, premine or instamine) and both private and public transaction support. The maximum supply of 42 coins makes the remaining 41.99 extremely rare. The innovative deflationary model provides a constant rise in incentives both for miners and long term investors. 42-coin delivers a hybrid of Proof-of-Work and Proof-of-Stake transaction confirmation methods and represents a new way of securing the network against 51% attacks.",
//         },
//         {
//             "Acronym": "ADT",
//             "Id": "188858",
//             "Url": "/coins/adt/overview",
//             "ImageUrl": "/media/1383829/adt.png",
//             "ContentCreatedOn": 1500492928,
//             "Name": "ADT",
//             "Symbol": "ADT",
//             "CoinName": "AdToken",
//             "FullName": "AdToken (ADT)",
//             "Description": "AdChain is an Ethereum-based digital advertisement platform that aims to fix  the fraudulent environment of online advertising namely bot traffic, malvertisements, trackers, spoofed domains, lack of coordination and systemic fraud. ADT is an ERC20 token that is used in order to ver publishers who wish to join the system, employing a \"challenge period\" during which any ADT holder who believes the publisher is fraudulent can issue a challenge and match the publisher&#39;s ADT deposit.  ",
//         },
//         {
//             "Acronym": "BTC",
//             "Id": "4321",
//             "Url": "/coins/42/overview",
//             "ImageUrl": "/media/35650717/42.jpg",
//             "ContentCreatedOn": 1427211129,
//             "Name": "42",
//             "Symbol": "42",
//             "CoinName": "42 Coin",
//             "FullName": "42 Coin (42)",
//             "Description": "Everything about 42 coin is 42 - apart from the transaction fees and difficulty retargetting - 0.00000001 and 7.5mins. A scrypt coin with 42 coins max, a 42 second block time, with superblocks giving 10 times the standard block reward of 0.0000420 42&#39;s.42 coin is a cryptocurrency with completed emission, fair distribution (no ICO, premine or instamine) and both private and public transaction support. The maximum supply of 42 coins makes the remaining 41.99 extremely rare. The innovative deflationary model provides a constant rise in incentives both for miners and long term investors. 42-coin delivers a hybrid of Proof-of-Work and Proof-of-Stake transaction confirmation methods and represents a new way of securing the network against 51% attacks.",
//         },
//           ]
//         }
//     }

//     return (
//     response.content.Cryptos.map((element) => {
//       return (
//       <div className={classes.frame}>
//         <Card variant="outlined" className={classes.root}>
//         <CardActionArea>
//             <CardMedia
//             className={classes.media}
//             image= {baseUrl + element.ImageUrl}
//             />
//             <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//                 {element.Name}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//                 {element.Description}
//             </Typography>
//             </CardContent>
//         </CardActionArea>
//         <CardActions>
//             <Button size="small" variant="outlined">
//               Share
//             </Button>
//             <Button size="small" variant="outlined">
//               Learn More
//             </Button>
//         </CardActions>
//         </Card>
//       </div>)
//     })
//   );
// };
