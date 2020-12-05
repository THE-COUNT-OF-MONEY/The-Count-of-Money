// const currenciesService = require('../services/currencyService.js')
// const http = require('http')
const https = require('https');
const request = require('request');

const { settingsService } = require('../services/settingsService.js');
const UserService = require('../services/userService.js');

let settingsDb = new settingsService();

class SettingsController {
  constructor() {}

  async setOneCrypto(req, res) {
    let UserId = req.params.UserId;
    var postParams = req.body;
    let userExist = await UserService.findnoerror(UserId);
    if (userExist) {
      return res
        .status(200)
        .send(
          await settingsDb.updateOneSettingDocument('Users', UserId, postParams)
        );
    } else return res.status(400).send('Error Bad User');
  }

  async getOneSetting(req, res) {
    let UserId = req.params.UserId;
    let userExist = await UserService.findnoerror(UserId);
    if (userExist) {
      return res
        .status(200)
        .send(await settingsDb.getOneSettingDocument('Users', UserId));
    } else return res.status(400).send('Error Bad User');
  }
}

module.exports = {
  SettingsController
};
