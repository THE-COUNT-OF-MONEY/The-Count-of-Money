const csrf = require('csurf');
const cors = require('cors')
const cookieParser = require('cookie-parser')

exports.initializeCSRF = (app) => {
  // app.use(cookieParser())

  // const csrfMiddleware = csrf({ cookie: true, httpOnly: true})
  // app.use(csrfMiddleware)

  // app.all("*", (req, res, next) => {
  //   res.cookie("XSRF-TOKEN", req.csrfToken());
  //   next();
  // })
}

exports.initializeCORS = (app) => {
  app.use(cors());
}