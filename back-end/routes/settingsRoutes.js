const { SettingsController } = require('../controller/settingsController.js');
const authService = require('../services/authService.js');
const database = require('../services/database');

let SettingService = new SettingsController();

async function update(req, res) {
    const authorization = req.headers.authorization;
    const user = await authService.getUserFromAuthorization(authorization);

    if (user === undefined || user.role !== "ROLE_ADMIN")
        return res.status(400).send({message: 'Access denied.'})
      
    const feedLimit = req.body.feedLimit;
    const cryptoLimit = req.body.cryptoLimit;
    
    if (feedLimit < 0 || cryptoLimit < 0)
      return res.status(400).send({message: 'Wrong parameters submitted for cryptoLimit, feedLimit.'})
    
    const data = {
      feedLimit: feedLimit,
      cryptoLimit: cryptoLimit,
    }

    database.updateDocument('Settings', data, 'config')
  
    return res.status(200).send({message: 'Settings successfully updated.'})
}

async function getSettings(req, res) {
    const settings = await database.getDocument('Settings', 'config');

    return res.send({settings: settings});
}

module.exports = {
  update,
  getSettings
};
