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
    getAll,
    getOneCrypto,
    deleteOneCryptoDocument,
    createOneCryptoDocument,
    getAllCrypto
}