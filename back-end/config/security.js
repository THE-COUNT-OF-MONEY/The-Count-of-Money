const csrf = require('csurf');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

exports.initializeCSRF = (app, router) => {
  var csrfProtection = csrf({ cookie: true });
  var parseForm = bodyParser.json({ extended: false });

  app.use(cookieParser());

  app.get('/csrf', parseForm, csrfProtection, function (req, res) {
    const response = {
      message: 'csrfToken successfully gotten',
      content: {
        csrfToken: req.csrfToken()
      }
    };
    res.send(response);
  });

  app.post('*', parseForm, csrfProtection, function (req, res, next) {
    next();
  });

  app.post('/test', parseForm, csrfProtection, function (req, res) {
    const response = {
      message: 'Nice you came inside!!!'
    };
    res.send(response);
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
