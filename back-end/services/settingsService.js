const { post } = require('request');
const database = require('./database.js');

class settingsService {
  constructor() {}

  async updateOneSettingDocument(collectionName, UserId, postParams) {
    return database.updateOneSettingDocument('Users', UserId, postParams);
  }

  async getOneSettingDocument(collectionName, UserId) {
    return database.getOneSettingDocument('Users', UserId);
  }
}

module.exports = {
  settingsService
};
