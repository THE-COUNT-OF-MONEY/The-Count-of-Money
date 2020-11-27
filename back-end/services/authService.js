const userService = require('./userService.js')
const database = require('./database.js');

async function login(email, password) {
    
    let userId = undefined;
    
    try {
        userId = await database.signInWithEmailAndPassword(email, password);
    } catch (e) {
        return undefined;
    }

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

/** SigIn Google Account to firebase with tokenId */
async function googleAuth (token) {
    return await database.signInWithGoogle(token);
}


module.exports = {
    login,
    getUserFromAuthorization
}