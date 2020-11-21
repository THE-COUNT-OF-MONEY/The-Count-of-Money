const { generateToken } = require('./database.js');
const userService = require('./userService.js')
const database = require('./database.js')

async function login(email, password) {
    
    const userId = await database.signInWithEmailAndPassword(email, password);
    
    if (userId === undefined)
        return undefined;

    const token = await database.generateToken(userId);

    return token;
}

async function getUserFromAuthorization(authorization) {

    if (authorization === undefined)
        return undefined;
    
    const token = authorization.replace('Bearer ','');
    const userId = await database.verifyToken(token);

    if (userId === undefined)
        return undefined;
    
    const user = await userService.find(userId);

    return user;
}


module.exports = {
    login,
    getUserFromAuthorization
}