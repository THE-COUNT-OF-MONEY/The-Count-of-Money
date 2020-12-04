// const currenciesService = require('../services/currencyService.js')
// const http = require('http')
const https = require('https');
const request = require('request');

const { CryptosBankService } = require('../services/cryptosbankService.js');
const { CurrencyService } = require('../services/currencyService.js');
const UserService = require('../services/userService.js');

let CryptoDb = new CryptosBankService();
let CurrenDb = new CurrencyService();
// let UserDb = new UserService();

class CryptosBankController {
  constructor() {}

  async setOneCrypto(data, res) {
    let UserId = data.params.UserId;
    let CurrId = data.params.CurrId;
    let userExist = await UserService.findnoerror(UserId);
    try {
      if (Object.keys(userExist).length) {
        try {
          let currstate = await await CurrenDb.find(CurrId);
          if (currstate.exists) {
            let ret = await CryptoDb.createOne(userExist, currstate.data());
            return res
              .status(200)
              .send(
                'Currency and User Exist Creating The currency ' +
                  JSON.stringify(ret)
              );
          } else {
            throw 'Currency Missing from Database ';
          }
        } catch (e) {
          return res.status(400).send('Currencies error ' + e.toString());
        }
      } else {
        return res.status(400).send('User Data Missing');
      }
    } catch (e) {
      return res.status(400).send('Missing UserID');
    }
    // console.log(userExist.exists);

    // let mycheckres;
    // let myres;
    // let id = data.params.UserId;
    // mycheckres = await CryptoDb.find(data.params.UserId);
    // // myres.then(function(doc) {
    // if (mycheckres.exists) {
    //   console.log("HERE " + mycheckres.exists);
    //   myres = await CryptoDb.delete(data.params.CurId).then(function (data) {
    //     res.status(200).send(id + " Deleted");
    //   });
    // } else {
    //   console.log("Not HERE " + mycheckres.exists);
    //   // console.error("Error removing document: ", error);
    //   res.status(400).send('This ID doesn\'t exist in this DB');
    // }
    // return await myres;

    // let myres;
    // // myres.then(function(doc) {
    //   if (myres.length != 0) {
    //   console.log("Document data:", myres);
    //   res.status(200).send(myres);
    // } else {
    //   console.log("No such document!");
    console.log('hahaha');
    // }
  }

  async getOneCryptos(data, res) {
    let myres;
    myres = await CryptoDb.getall();
    let UserId = data.params.UserId;
    let CurrId = data.params.CurrId;
    let userExist = await UserService.findnoerror(UserId);
    // myres.then(function(doc) {
    let MyResRet = [];

    try {
      Object.keys(myres).forEach(function loop(key) {
        if (loop.stop) {
          // Normalement pas sensé avoir plus de 1 resultat...
          return;
        }

        if (myres[key].user == UserId && myres[key].currency == CurrId) {
          loop.stop = true;
          // MyResRet[] = myres[key];
          MyResRet.push(myres[key]);
        }
        // CryptoDb.create(result);
      });
      if (myres.exists != 0) {
        // console.log('Document data:', myres);
        res.status(200).send(MyResRet);
      } else {
        console.log('No such document!');
        res.status(400).send("This ID doesn't exist in this DB");
      }
    } catch (e) {
      res.status(400).send('Error User Not Found, fix UserID');
    }
    return null;
  }

  async getAllCryptos(data, res) {
    let myres;
    myres = await CryptoDb.getall();
    let UserId = data.params.UserId;
    let userExist = await UserService.findnoerror(UserId);
    // myres.then(function(doc) {
    let MyResRet = [];

    try {
      if (Object.keys(userExist).length) {
        Object.keys(myres).forEach(function (key) {
          if (myres[key].user == UserId) {
            // MyResRet[] = myres[key];
            MyResRet.push(myres[key]);
          }
          // CryptoDb.create(result);
        });
        if (myres.exists != 0) {
          // console.log('Document data:', myres);
          res.status(200).send(MyResRet);
        } else {
          console.log('No such document!');
          res.status(400).send("This ID doesn't exist in this DB");
        }
      }
    } catch (e) {
      res.status(400).send('Error User Not Found, fix UserID');
    }
    return null;
  }

  async deleteOneCrypto(data, res) {
    let myres;
    myres = await CryptoDb.getall();
    let UserId = data.params.UserId;
    let CurrId = data.params.CurrId;
    let userExist = await UserService.findnoerror(UserId);
    // myres.then(function(doc) {
    let MyResRet = [];

    try {
      Object.keys(myres).forEach(function loop(key) {
        if (loop.stop) {
          // Normalement pas sensé avoir plus de 1 resultat...
          return;
        }

        if (myres[key].user == UserId && myres[key].currency == CurrId) {
          loop.stop = true;
          // MyResRet[] = myres[key];
          MyResRet.push(myres[key]);
        }
        // CryptoDb.create(result);
      });
      if (myres.exists != 0) {
        // console.log('Document data:', myres);

        await CryptoDb.delete(MyResRet[0].id).then(function (data) {
          res.status(200).send(MyResRet[0].id + ' Deleted');
        });
        // res.status(200).send(MyResRet);
      } else {
        console.log('No such document!');
        res.status(400).send("This ID doesn't exist in this DB");
      }
    } catch (e) {
      res.status(400).send('Error User Not Found, fix UserID');
    }
    return null;
  }
}

module.exports = {
  CryptosBankController
};
