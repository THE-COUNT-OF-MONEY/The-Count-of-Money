const { CurrencyController } = require('../controller/currenciesController.js');

let CryptoService = new CurrencyController();

function getAll(req, res)
{
     return CryptoService.createAll(req, res);
    // return res.send('Get All Cryptos Ez');
}

module.exports = {
    getAll,
}