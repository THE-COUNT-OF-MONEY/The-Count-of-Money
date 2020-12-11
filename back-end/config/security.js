const csrf = require('csurf');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');


exports.initializeCSRF = (app, router) => {
  
  var csrfProtection = csrf({ cookie: true });
  var parseForm = bodyParser.json({ extended: false });
  
  app.use(cookieParser());

  app.get('/csrf', parseForm, csrfProtection, function (req, res) {
      const response = {
          'message': 'csrfToken successfully gotten',
          'content': {
              'csrfToken': req.csrfToken(),
          }
      }
      res.send(response);
  });

  app.post("*", parseForm, csrfProtection, function (req, res, next) {
    next();
  });
}

exports.initializeCORS = (app) => {
  app.use(cors());
}