const database = require('./database.js')

function find(userId) {
    return database.getDocument('Users', userId);
}

function findAll() {
    return database.getCollection('Users');
}

function create(data) {
    return database.newUser(data);
}

function update(userId, data) {
    return database.updateDocument('Users', data, userId);
}

function remove(userId) {
    // return database.deleteDocument('Users', userId);
}

module.exports = {
    find,
    create,
    update,
    remove
}