const database = require('./database.js')

class CurrencyService {
  constructor() {
  }

  find(curid) {
    return database.getDocument('Currencies', curid);
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

  update(curid, data) {
    return database.updateDocument('Currencies', data, curid);
  }

  delete(curid) {
    return database.deleteDocument('Currencies', curid);
  }

  deleteAll() {
    return database.DeleteAllCryptos('Currencies', userId);
  }
}

module.exports = {
  CurrencyService
}