const userService = require('../services/userService.js')
const authService = require('../services/authService.js');

async function getAllUsers(req, res)
{
    const users = await userService.findAll();

    const response = {
        'message': "Users successfully gotten",
        'content': {
            'users': users,
        }
    }
    return res.status(200).send(response);
}

async function getProfile(req, res)
{
    const authorization = req.headers.authorization;
    const user = await authService.getUserFromAuthorization(authorization);

    if (user === undefined)
        return res.status(400).send({message: 'Error user is not logged.'})

    const response = {
        'message': "User profile successfully gotten",
        'content': {
            'user': user,
        }
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
        'role': 'ROLE_USER'
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
    getAllUsers,
    getProfile,
    editProfile,
    register,
}