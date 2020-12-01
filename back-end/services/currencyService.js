const database = require('./database.js')

class CurrencyService {
  constructor() {
  }

  async find(curid) {
    let datagot = await database.getOneCryptoDocument('Cryptos', curid);
    // await this.delay();
    return await datagot; 
  }

  async getall(curid) {
    let datagot = await database.getCollection('Cryptos');
    // await this.delay();
    return await datagot; 
  }

  async findByName(name) {
    let datagot = await database.getOneCryptoDocumentByName('Cryptos', name);
    return await datagot; 
  }

  create(data) {
    //console.log("Content Creation ?");
    // Add a new document in collection "cities" with ID 'LA'
    //   const res = await database.collection('cities').doc('LA').set(data);
    Object.keys(data['Cryptos']).forEach(function(key) {
      database.newCrypto(data['Cryptos'][key]);
    });
    // return database.newCrypto('Currencies', data, id);
  }

  newCryptowithId(collectionName, fields) {
    return database.createNewCryptowithId(collectionName, fields);
  }

  update(curid, data) {
    return database.updateDocument('Cryptos', data, curid);
  }

  async delete(curid) {
    let data = await database.deleteOneCryptoDocument('Cryptos', curid);
    return await data;
  }

  // deleteAll() {
  //   return database.DeleteAllCryptos('Currencies', userId);
  // }
}

module.exports = {
  CurrencyService
}