const database = require('./database.js')

const service = class CurrencyService {
    find(curid) {
        return database.getDocument('Currencies', curid);
    }

    create(data) {
        const dataz = {
            name: 'Los Angeles',
            state: 'CA',
            country: 'USA'
          };
          
          console.log("Content Creation ?");
          // Add a new document in collection "cities" with ID 'LA'
        //   const res = await database.collection('cities').doc('LA').set(data);
        // return database.newDocument('Currencies', data);
   }

    update(curid, data) {
        return database.updateDocument('Currencies', data, curid);
    }

    delete(curid) {
        return database.deleteDocument('Currencies', curid);
    }

    deleteAll() {
        return database.DeleteAllCryptos('Currencies', userId);
        
    }
}

module.exports = {

}