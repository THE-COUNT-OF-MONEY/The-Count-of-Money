const { CurrencyController } = require('../controller/currenciesController.js');

let CryptoService = new CurrencyController();

function getAll(req, res)
{
    return CryptoService.createAll(req, res);
    // return res.send('Get All Cryptos Ez');
}

function getOneCrypto(req, res)
{
    return CryptoService.getOne(req, res);
    // return res.send('Get All Cryptos Ez');
}

module.exports = {
    getAll,
    getOneCrypto
}