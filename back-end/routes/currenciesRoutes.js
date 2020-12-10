const { database } = require('firebase');
const { CurrencyController } = require('../controller/currenciesController.js');

let CryptoService = new CurrencyController();

async function setAll(req, res)
{
    const cryptos = await CryptoService.setAll();
    const response = {
        message: 'Cryptos successfully updated.',
        content: {
            cryptos: cryptos
        }
    }

    return res.send(response);
}

async function getOneCrypto(req, res)
{
    const crypto = await CryptoService.getOne(req.params.CurId)

    if (crypto === undefined)
        return res.status(404).send({'message': 'Ressource not found.'})

    const response = {
        message: 'Crypto successfully gotten.',
        content: {
            crypto: crypto
        }
    }

    return res.send(response);
}

async function getAllCrypto(req, res)
{
    const cryptos = await CryptoService.getAllCryptos();

    const response = {
        message: 'Cryptos successfully gotten',
        content: {
            cryptos: cryptos
        }
    }
    return res.send(response)
}

async function deleteOneCryptoDocument(req, res)
{
    const currencyId = req.params.CurId;
    const crypto = CryptoService.getOne(currencyId)

    if (crypto === null)
        return res.status(404).send({'message': 'Ressource not found.'})

    const status = await CryptoService.deleteOne(currencyId);

    if (status === false)
        return res.status(400).send({'message': 'An error occur during crypto deletion.'})

    return res.send({'message': 'Crypto successfully deleted'})
}

async function createOneCryptoDocument(req, res)
{
    if (req.body.symbol === undefined || req.body.description === undefined || req.body.name === undefined || req.body.image === undefined)
        return res.status(400).send({'message': 'Missing parameters'})

    const data = {
        symbol: req.body.symbol,
        description: req.body.description,
        name: req.body.name,
        image: req.body.image,
        historic: [],
        created: true
    }

    const found = await CryptoService.getOne(data.symbol);

    if (found !== undefined)
        return res.status(400).send({'message': 'The crypto already exist in database.'})
    
    const newCrypto = await CryptoService.createOne(data);
    const response = {
        message: 'Crypto successfully created',
        content: {
            crypto: data
        }
    }
    
    return res.send(response)
}


module.exports = {
    setAll,
    getOneCrypto,
    deleteOneCryptoDocument,
    createOneCryptoDocument,
    getAllCrypto,
}