const currenciesService = require('../services/currencyService.js')
// const http = require('http')
const https = require('https');
const request = require('request');

class CurrencyController {
    pushIt(res, body) {
        try {
            request('https://min-api.cryptocompare.com/data/all/coinlist', { json: true }, (err, newres, body) => {
            if (err) { console.log(err);
                return 'Error';
            }
            console.log("ErroR?");
            return res.status(200).send(newres);
        });
        } catch(e) {
            res.status(400).send('Error');
            // unpushit();
            // return ('Error');
            // next(e);
        }
        // return ('Error '  );
    }

    constructor() {
        // const options = {
        //     hostname: 'min-api.cryptocompare.com',
        //     headers: {
        //         // 'Host' : 'min-api.cryptocompare.com',
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer d0577735aa68c35cdca389fef9a263ffa5d6aa59c23c3985c9de2aa33669f839'
        //     },
        //     port: 8000,
        //     path: '/data/all/coinlist',
        //     method: 'GET'
        // }
    }
    find(cureId) {
    }

    async createAll(data, res) {
       const request = require('request');
        console.log("Bfor?");
        let ObjRes = new Object();
        var x = await this.pushIt(res);
    
        // if (x != 'Error')
        return x
        // return x;
    // console.log("AfTr? " + user);
    // const req = http.request(this.options, res => {
    //     console.log(`statusCode: ${res.statusCode}`)
        
    //     res.on('data', d => {
    //       process.stdout.write(d)
    //     })
    //   })
        
    //   req.on('error', error => {
    //     console.error(error)
    //   })
    //   req.end()
    // if (data === undefined)
        // return res.status(400).send({message: 'Error API is down'})
    const response = {
        'message': "Getting List of Coins from API successfully gotten",
        'Coins': "hahaha",
    }
    // return currenciesService.create('Users', data);
    }
}

module.exports = {
    CurrencyController,
}