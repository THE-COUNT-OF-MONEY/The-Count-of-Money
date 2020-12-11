const database = require('./database.js');

class ChangesService {
  constructor() {}

  async getall(userID) {
    let datagot = await database.getDocumentsByUserID('Changes', userID);

    if (!datagot) {
      console.log('No matching documents.');
      return;
    }
    return await datagot;
  }

  async create(data) {
    let rtrndoc = await database.newDocument('Changes', data);
    return rtrndoc;
  }

  update(DocID, data) {
    return database.updateDocument('Changes', data, DocID);
  }

  delete(userID) {
    return database.deleteDocumentsByUserID('Changes', userID);
  }
}

module.exports = {
  ChangesService
};
