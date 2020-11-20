const database = require('./database.js')

const service = class UserService {
    find(userId) {
        return database.getDocument('Users', userId);
    }

    create(data) {
        return database.newDocument('Users', data);
    }

    update(userId, data) {
        return database.updateDocument('Users', data, userId);
    }

    delete(userId) {
        return database.deleteDocument('Users', userId);
    }
}

module.exports = {

}