// const currenciesService = require('../services/currencyService.js')
// const http = require('http')
const https = require('https');
const request = require('request');

const database = require('../services/database.js'); // c comme ca quon import une klasse
const { CurrencyService } = require('../services/currencyService.js'); // c comme ca quon import une klasse

let CryptoDb = new CurrencyService();

class CurrencyController {

  constructor() {}

  delay() {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function () {
        resolve(0); // After 3 seconds, resolve the promise with value 0
      }, 3000);
    });
  }

  async getHistoDay(limit, symbol, type) {
    let url = "https://min-api.cryptocompare.com/data/v2/histoday"

    url += '?fsym=' + symbol;
    url += '&tsym=' + type;
    url += '&limit=' + limit;

    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, newres, body) => {

        if (err)
          resolve([]);

        resolve(body.Data.Data);
      })
    })
  }


  async formatCrypto(crypto, BaseImageUrl) {

    const histoday = await this.getHistoDay(2, crypto.Symbol, "EUR");

    const data = {
      symbol: crypto.Symbol,
      description: crypto.Description,
      name: crypto.CoinName,
      image: BaseImageUrl + crypto.ImageUrl,
      cryptoId: crypto.Id,
      historic: histoday
    }

    return data;
  }

  async formatCryptos(body, limit) {
    const data = body.Data;
    const cryptos = [];
    let count = 0;
  
    for (const [key, element] of Object.entries(data)) {

      if (count > limit)
        return cryptos;

      let crypto = await this.formatCrypto(element, body.BaseImageUrl);

      cryptos.push(crypto);
      count += 1;
    }

    return cryptos;
  }

  async getCryptosFromExternalApi() {
    
    const url = 'https://min-api.cryptocompare.com/data/all/coinlist';
  
    return new Promise((resolve, reject) => {
      request(url, { json: true }, async (err, newres, body) => {

        if (err)
          return res.status(400).send({'message': 'An error occur during data recuperation.'});

        const cryptos = await this.formatCryptos(body, 1);
        resolve(cryptos);
      })
    })
  }

  async getAllCryptos() {
    return await database.getCollection('Cryptos');
  }

  async setAll() {
    var cryptos = await this.getCryptosFromExternalApi();

    for (const [key, crypto] of Object.entries(cryptos))
      database.newDocumentWithId('CryptoTests', crypto, crypto.symbol)

    return cryptos;
  }

  async getOne(currencyId) {
    return await database.getDocument('Cryptos', currencyId);
  }

  async deleteOne(currencyId) {
    return await database.deleteDocument('Cryptos', currencyId);
  }

  async createOne(data) {
    return database.newDocumentWithId('Cryptos', data, data.symbol);
  }
}

module.exports = {
  CurrencyController
};
