const csrf = require('csurf');
const cors = require('cors')
const cookieParser = require('cookie-parser')

exports.initializeCSRF = (app, router) => {
    // app.use(cookieParser())

    // const csrfProtection = csrf({ cookie: true, httpOnly: true })

    // app.use(csrfProtection);
    
    // app.all("*", csrfProtection, (req, res, next) => {

    //   if (req.url === '/csrf') {
    //     next();
    //   } else {
    //       res.cookie("XSRF-TOKEN", req.csrfToken());
    //   }
    //   next();
    // })

    // app.get('/csrf', csrfProtection, (req, res) => {
    //   // pass the csrfToken to the view
    //   const response = {
    //     'message': 'csrfToken successfully gotten',
    //     'content': {
    //       'csrfToken': req.csrfToken(),
    //     }
    //   }
    //   res.send(response);
    // })
}

exports.initializeCORS = (app) => {
  app.use(cors());
}