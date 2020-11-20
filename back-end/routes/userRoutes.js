
function getProfile(req, res)
{ 
    return res.send('get user profile');
}

function editProfile(req, res)
{
    return res.send('edit user profile');
}

function login(req, res)
{
    return res.send('login');
}

function logout(req, res)
{
    return res.send('logout');
}

function register(req, res)
{
    return res.send('register');
}

module.exports = {
    getProfile,
    editProfile,
    login,
    logout,
    register,
}