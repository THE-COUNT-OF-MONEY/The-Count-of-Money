const { CurrencyController } = require('../controller/currenciesController.js');

let CryptoService = new CurrencyController();

function setAll(req, res)
{
    return CryptoService.setAll(req, res);
    // return res.send('Get All Cryptos Ez');
}

function getOneCrypto(req, res)
{
    return CryptoService.getOne(req, res);
    // return res.send('Get All Cryptos Ez');
}

function getAllCrypto(req, res)
{
    return CryptoService.getAllCryptos(req, res);
}

function deleteOneCryptoDocument(req, res)
{
    return CryptoService.deleteOne(req, res);
    // return res.send('Get All Cryptos Ez');
}

function createOneCryptoDocument(req, res)
{
    return CryptoService.createOne(req, res);
}


module.exports = {
    setAll,
    getOneCrypto,
    deleteOneCryptoDocument,
    createOneCryptoDocument,
    getAllCrypto,
}