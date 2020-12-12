const csrf = require('csurf');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

exports.initializeCSRF = (app, router) => {
  
  app.use(cookieParser());

  var csrfProtection = csrf({ cookie: true });
  var parseForm = bodyParser.json({ extended: false });
  
  router.get('/csrf', parseForm, csrfProtection, function (req, res) {
    const response = {
      message: 'csrfToken successfully gotten',
      content: {
        csrfToken: req.csrfToken()
      }
    };
    res.send(response);
  });
  
  router.post('*', parseForm, csrfProtection, function (req, res, next) {
    next();
  });
};

exports.initializeCORS = (app) => {
  const corsOptions = {
    //To allow requests from client
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'http://127.0.0.1',
      'http://127.0.0.1:3000',
      'http://mydomain.com'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
  };

  app.use(cors(corsOptions));
};
