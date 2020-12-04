const database = require('./database.js');

class CryptosBankService {
  constructor() {}

  async find(curid) {
    // GET ONE
    let datagot = await database.getOneCryptoBankDocument('Cryptosbank', curid);
    return await datagot;
  }

  async createOne(user, curr) {
    let datagot = await database.createNewCryptoInBankFromUserwithCrypto(
      'Cryptosbank',
      user,
      curr
    );
    return await datagot;
  }

  async getall() {
    const datagot = await database.getPkCryptoBankrow('Cryptosbank');
    return await datagot;
  }

  // async findByName(name) {
  //   let datagot = await database.getOneCryptoDocumentByName('Cryptosbank', name);
  //   return await datagot;
  // }

  newCryptowithId(collectionName, fields) {
    return database.createNewCryptowithId(collectionName, fields);
  }

  update(curid, data) {
    return database.updateDocument('Cryptosbank', data, curid);
  }

  async delete(curid) {
    let data = await database.deleteOneCryptoBankDocument('Cryptosbank', curid);
    return await data;
  }

  // deleteAll() {
  //   return database.DeleteAllCryptos('Currencies', userId);
  // }
}

module.exports = {
  CryptosBankService
};
