const userService = require('../services/userService.js')
const authService = require('../services/authService.js');

async function getProfile(req, res)
{
    const authorization = req.headers.authorization;
    const user = await authService.getUserFromAuthorization(authorization);

    if (user === undefined)
        return res.status(400).send({message: 'Error user is not logged.'})

    const response = {
        'message': "User profile successfully gotten",
        'user': user,
    }

    return res.status(200).send(response);
}

async function editProfile(req, res)
{
    const authorization = req.headers.authorization;
    const user = await authService.getUserFromAuthorization(authorization);

    if (user === undefined)
        return res.status(400).send({message: 'Error user is not logged.'})

    if (req.body === undefined)
        return res.status(400).send({message: 'No parameters founded.'})
        
    const data = {
        'firstname': req.body.firstname ?? user.firstname,
        'lastname': req.body.lastname ?? user.lastname,
    };
    userService.update(user.id, data)

    const response = {
        'message': "User successfully updated."
    }

    return res.send(response);
}

async function login(req, res)
{
    const email = req.body.email;
    const password = req.body.password;
 
    if (email === undefined || password === undefined)
        return res.status(400).send({message: 'Parameter missing'})

    const token = await authService.login(email, password)

    const response = {
        'content': {
            'token': token
        },
        'message': 'User successfully authentificated.'
    }
    return res.send(response);
}

async function logout(req, res)
{
    const authorization = req.headers.authorization;
    const user = await authService.getUserFromAuthorization(authorization);

    if (user === undefined)
        return res.status(400).send({message: 'Error user is not logged.'})
    
    const data = {
        'message': 'User successfully signedOut',
    }

    return res.send(data);
}

async function register(req, res)
{
    const {email, firstname, lastname, password} = req.body;

    if (email === undefined || password === undefined || firstname === undefined || lastname === undefined)
        return res.status(400).send({message: 'Parameters missing.'})

    const data = {
        'email': email,
        'password': password,
        'firstname': firstname,
        'lastname': lastname,
    }

    const result = await userService.create(data);

    if (result === undefined)
        return res.status(400).send({message: 'An error occur during user creation.'})

    const response = {
        'content': {
            'user': result
        },
        'message': 'User successfully authentificated.'
    }

    return res.status(201).send(response);
}

module.exports = {
    getProfile,
    editProfile,
    login,
    logout,
    register,
}