const { SettingsController } = require('../controller/settingsController.js');

let SettingService = new SettingsController();

function update(req, res) {
  return SettingService.setOneCrypto(req, res);
  // return res.send('Get All Cryptos Ez');
}

function getSettings(req, res) {
  return SettingService.getOneSetting(req, res);
  // return res.send('Get All Cryptos Ez');
}

module.exports = {
  update,
  getSettings
};
