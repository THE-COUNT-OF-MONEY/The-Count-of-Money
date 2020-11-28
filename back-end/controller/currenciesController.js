// const currenciesService = require('../services/currencyService.js')
// const http = require('http')
const https = require('https');
const request = require('request');

const { CurrencyService } = require('../services/currencyService.js'); // c comme ca quon import une klasse

let CryptoDb = new CurrencyService();


class CurrencyController {
  delay() {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function () {
        resolve(0); // After 3 seconds, resolve the promise with value 0
      }, 3000);
    });
  }

  async pushIt(res, body) {
    let ObjRes = new Object();
    let idx = 0;
    ObjRes = {
      Cryptos: [],
    };
    try {
      await request('https://min-api.cryptocompare.com/data/all/coinlist', { json: true }, (err, newres, body) => {
        if (err) { //console.log(err);
          return 'Error api request';
        }
        Object.keys(body).forEach(key => {
          // console.log(x[body]); // the value of the current key.
          Object.keys(body[key]).forEach(newkey => {
            if (isNaN(newkey.toString()) && idx < 2) {
              // console.log(body[key][newkey].Id);        // the name of the current key.
              ObjRes.Cryptos.push({ "Id": body[key][newkey].Id, "Name": body[key][newkey].Name, "Description": body[key][newkey].Description, "ImageUrl": body[key][newkey].ImageUrl, "BaseImageUrl": body['BaseImageUrl'] });
              idx++;
            }
          });
        });
        res.status(200).send(ObjRes);
      });
      await this.delay();
      return await ObjRes;
    } catch (e) {
      res.status(400).send('Error');
      return 'Error 400 On Api Request'
      // unpushit();
      // return ('Error');
      // next(e);
    }
    return null;
  }

  constructor() {
    // const options = {
    //     hostname: 'min-api.cryptocompare.com',
    //     headers: {
    //         // 'Host' : 'min-api.cryptocompare.com',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer d0577735aa68c35cdca389fef9a263ffa5d6aa59c23c3985c9de2aa33669f839'
    //     },
    //     port: 8000,
    //     path: '/data/all/coinlist',
    //     method: 'GET'
    // }
  }
  // find(cureId) {
  // }

  createAll(data, res) {
    const request = require('request');
    var x = this.pushIt(res);
    var Obj;
    x.then(function (result) {
      Obj = result;
      Object.keys(result).forEach(function (key) {
        // console.log(key, result[key]);
        CryptoDb.create(result);
      });
    });

    // var tmp = currenciesService.find(1);
    // console.log(" Ttmp ==> " + tmp);
    // if (x != 'Error')
    // return x;
    // return x;
    // console.log("AfTr? " + user);
    // const req = http.request(this.options, res => {
    //     console.log(`statusCode: ${res.statusCode}`)

    //     res.on('data', d => {
    //       process.stdout.write(d)
    //     })
    //   })

    //   req.on('error', error => {
    //     console.error(error)
    //   })
    //   req.end()
    // if (data === undefined)
    // return res.status(400).send({message: 'Error API is down'})

    return Obj;
  }

  async getOne(data, res) {
    let myres;
    myres = await CryptoDb.find(data.params.CurId);
    // myres.then(function(doc) {
    if (myres.exists) {
      console.log("Document data:", myres.exists);
      res.status(200).send(myres.data());
    } else {
      console.log("No such document!");
      res.status(400).send('This ID doesn\'t exist in this DB');
    }
    // });
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });

    // console.log(myres);
    return await myres;
  }

  async deleteOne(data, res) {
    let mycheckres;
    let myres;
    let id = data.params.CurId;
    mycheckres = await CryptoDb.find(data.params.CurId);
    // myres.then(function(doc) {
    if (mycheckres.exists) {
      console.log("HERE " + mycheckres.exists);
      myres = await CryptoDb.delete(data.params.CurId).then(function (data) {
        res.status(200).send(id + " Deleted");
      });
    } else {
      console.log("Not HERE " + mycheckres.exists);
      // console.error("Error removing document: ", error);
      res.status(400).send('This ID doesn\'t exist in this DB');
    }
    return await myres;
  }

  async createOne(data, res) {
    let myres;

    myres = await CryptoDb.findByName(data.body.Name);
    if (myres) {
      // console.log("Document data:", myres.exists);
      res.status(400).send("This Cryptocurrency Document Name is already in database " + data.body.Name);
    } else {
      // console.log("No such document!");
      res.status(200).send('This Crypto doesn\'t exist in this DB ' + data.body.Name);
      let fields = new Object();
      fields.BaseImageUrl = data.body.BaseImageUrl;
      fields.Description = data.body.Description;
      // fields.Id = data.body.Id;
      fields.ImageUrl = data.body.ImageUrl;
      fields.Name = data.body.Name;
      // fields.id = newId + "Manual";//data.body.id;
      await CryptoDb.newCryptowithId("Cryptos", fields);
      return "Pushed Successfully";
    }
    return null;
    }
}

module.exports = {
  CurrencyController,
}