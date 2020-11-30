const authService = require('../services/authService.js');

async function login(req, res)
{
    const email = req.body.email;
    const password = req.body.password;
 
    if (email === undefined || password === undefined)
        return res.status(400).send({message: 'Parameter missing'})

    const token = await authService.login(email, password)

    if (token === undefined)
        return res.status(400).send({'message': 'Wrong credentials.'});

    const response = {
        'content': {
            'token': token
        },
        'message': 'User successfully authentificated.'
    }

    return res.send(response);
}

async function loginWithProvider(req, res)
{
    const providers = ['google']
    const provider = req.params.provider;

    if (providers.includes(provider) === false)
        return res.status(400).send({'message': 'Unkown provider.'})
    
    const token = req.query.token;

    if (token === undefined)
        return res.status(400).send({'message': 'The token is missing in query.'})

    const status = await authService.googleAuth(token)

    if (status === false)
        return res.status(400).send({'message': 'Oauth2 for provider ' + provider + ' failed.'})

    
    const response = {
        'content': {
            'token': token
        },
        'message': 'OAuth2 successfully done.'
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

module.exports = {
    login,
    logout,
    loginWithProvider,
}