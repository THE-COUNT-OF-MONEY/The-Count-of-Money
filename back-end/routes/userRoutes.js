const userService = require('../services/userService.js');
const authService = require('../services/authService.js');
const { ChangesService } = require('../services/changesService.js');

let changesService = new ChangesService();

async function getAllUsers(req, res) {
  const users = await userService.findAll();

  const response = {
    message: 'Users successfully gotten',
    content: {
      users: users
    }
  };
  return res.status(200).send(response);
}

async function getProfile(req, res) {
  const authorization = req.headers.authorization;
  const user = await authService.getUserFromAuthorization(authorization);

  if (user === undefined)
    return res.status(400).send({ message: 'Error user is not logged.' });

  const response = {
    message: 'User profile successfully gotten',
    content: {
      user: user
    }
  };

  return res.status(200).send(response);
}

async function editProfile(req, res) {
  const authorization = req.headers.authorization;
  const user = await authService.getUserFromAuthorization(authorization);

  if (user === undefined)
    return res.status(400).send({ message: 'Error user is not logged.' });

  if (req.body === undefined)
    return res.status(400).send({ message: 'No parameters founded.' });

  const data = {
    firstname: req.body.firstname ?? user.firstname,
    lastname: req.body.lastname ?? user.lastname
  };
  userService.update(user.id, data);

  const response = {
    message: 'User successfully updated.'
  };

  return res.send(response);
}

async function register(req, res) {
  const { email, firstname, lastname, password } = req.body;

  if (
    email === undefined ||
    password === undefined ||
    firstname === undefined ||
    lastname === undefined
  )
    return res.status(400).send({ message: 'Parameters missing.' });

  const data = {
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    role: 'ROLE_USER'
  };

  const result = await userService.create(data);

  if (result === undefined)
    return res
      .status(400)
      .send({ message: 'An error occur during user creation.' });

  const response = {
    content: {
      user: result
    },
    message: 'User successfully authentificated.'
  };

  return res.status(201).send(response);
}

async function setChanges(req, res) {
  const authorization = req.headers.authorization;
  const user = await authService.getUserFromAuthorization(authorization);

  if (user === undefined)
    return res.status(400).send({ message: 'Error user is not logged.' });

  if (req.body === undefined)
    return res.status(400).send({ message: 'No parameters founded.' });

  if (req.body.Change === undefined)
    return res.status(400).send({ message: 'No Change parameters found.' });
  else if (req.body.Change != 'EUR' && req.body.Change != 'USD')
    return res.status(400).send({
      message:
        "Bad  parameters found. Maybe use 'USD' or 'EUR' ? instead of " +
        req.body.Change
    });

  const data = {
    Change: req.body.Change,
    UserID: user.id
  };

  let changeres;
  let changesArr = await changesService.getall(user.id);
  if (changesArr.length == 0) {
    changeres = await changesService.create(data);
    changesArr = await changesService.getall(user.id);
  } else {
    changeres = await changesService.update(changesArr[0].id, data);
    changesArr = await changesService.getall(user.id);
  }

  let NtError =
    (await changesArr) != ''
      ? "User's Change successfully Added"
      : "User's Changes successfully updated";

  const response = {
    message: NtError,
    content: {
      changes: changesArr
    }
  };

  return res.send(response);
}

async function getChanges(req, res) {
  const authorization = req.headers.authorization;
  const user = await authService.getUserFromAuthorization(authorization);
  let changesArr = '';

  if (user === undefined)
    return res.status(400).send({ message: 'Error user is not logged.' });

  changesArr = await changesService.getall(user.id);

  let NtError =
    (await changesArr) != ''
      ? `User Changes successfully gotten`
      : 'User Changes Missings';
  const response = {
    message: NtError,
    content: {
      changes: (await changesArr) != '' ? changesArr : null
    }
  };

  return res.status(200).send(response);
}

async function deleteChanges(req, res) {
  const authorization = req.headers.authorization;
  const user = await authService.getUserFromAuthorization(authorization);
  let changesArr = '';

  if (user === undefined)
    return res.status(400).send({ message: 'Error user is not logged.' });

  changesArr = await changesService.delete(user.id);

  const response = {
    message: 'User Changes successfully deleted'
  };

  return res.status(200).send(response);
}

module.exports = {
  getAllUsers,
  getProfile,
  editProfile,
  register,
  getChanges,
  setChanges,
  deleteChanges
};
