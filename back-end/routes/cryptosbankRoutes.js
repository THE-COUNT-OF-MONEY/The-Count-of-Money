const {
  CryptosBankController
} = require('../controller/cryptosbankController.js');

let CryptoService = new CryptosBankController();

function setOneCrypto(req, res) {
  return CryptoService.setOneCrypto(req, res);
  // return res.send('Get All Cryptos Ez');
}

function updateOneCrypto(req, res) {
  // return CryptoService.getOne(req, res);
  // return res.send('Get All Cryptos Ez');
}
function getAllhisCryptos(req, res) {
  return CryptoService.getAllCryptos(req, res);
}

function getOneCryptos(req, res) {
  return CryptoService.getOneCryptos(req, res);
}

function deleteOneCrypto(req, res) {
  return CryptoService.deleteOneCrypto(req, res);
  // return res.send('Get All Cryptos Ez');
}

function addOneCryptoDocument(req, res) {
  // return CryptoService.createOne(req, res);
}

module.exports = {
  getAllhisCryptos,
  setOneCrypto,
  deleteOneCrypto,
  getOneCryptos
};
