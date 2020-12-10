const database = require('../services/database.js');
const {
  CryptosBankController
} = require('../controller/cryptosbankController.js');

const userService = require('../services/userService.js');
const { CurrencyController } = require('../controller/currenciesController.js');
const authService = require('../services/authService.js');
let CryptoService = new CurrencyController();

async function getUserCryptos(req, res) {
  const authorization = req.headers.authorization;
  const currentUser = await authService.getUserFromAuthorization(authorization);
  const userId = req.params.userId;

  if (currentUser === undefined || userId !== currentUser['id'])
    return res.status(400).send({message: "Can't see different users bank"})

  const userCurrencies = await database.getDocumentsWhere('UserCurrencies', 'userId', userId);
  const cryptos = [];

  for (const [key, userCurrency] of Object.entries(userCurrencies)) {
    let crypto = await CryptoService.getOne(userCurrency['currencyId']);
    cryptos.push(crypto);
  }

  const response = {
    message: 'Crypto successfully gotten from bank.',
    content: {
      cryptos: cryptos
    }
  };

  return res.send(response)
}

async function addCryptoToBank(req, res) {
  const authorization = req.headers.authorization;
  const currentUser = await authService.getUserFromAuthorization(authorization);
  const userId = req.params.userId;
  const currencyId = req.params.currencyId;

  if (currentUser === undefined || userId !== currentUser['id'])
    return res.status(400).send({message: "Can't update different users"})

  const user = await userService.find(userId)
  const crypto = await CryptoService.getOne(currencyId);

  if (user === undefined || crypto === undefined)
    return res.status(400).send({message: 'Ressources not found.'})

  const currencies = database.getDocumentsWhere('UserCurrencies', 'currencyId', currencyId);

  if (currencies !== [])
    return res.status(400).send({message: 'Ressource already added.'})
    
  const data = {
    'userId': userId,
    'currencyId': currencyId
  }

  database.newDocument('UserCurrencies', data);

  const response = {
    message: 'Crypto successfully added in bank.'
  };

  return res.send(response)
}

async function deleteCryptoFromBank(req, res) {
  const authorization = req.headers.authorization;
  const currentUser = await authService.getUserFromAuthorization(authorization);
  const userId = req.params.userId;
  const currencyId = req.params.currencyId;

  if (currentUser === undefined || userId !== currentUser['id'])
    return res.status(400).send({message: "Can't update different users"})

  const user = await userService.find(userId)
  const crypto = await CryptoService.getOne(currencyId);

  if (user === undefined || crypto === undefined)
    return res.status(400).send({message: 'Ressources not found.'})
  

  const userCurrencies = await database.getDocumentsWhere('UserCurrencies', 'currencyId', currencyId);

  console.log(userCurrencies);

  for (const [key, userCurrency] of Object.entries(userCurrencies)) {
    database.deleteDocument('UserCurrencies', userCurrency['id']);
  }
  
  const response = {
    message: 'Crypto successfully deleted from bank.'
  };

  return res.send(response)
}

module.exports = {
  getUserCryptos,
  addCryptoToBank,
  deleteCryptoFromBank
};
