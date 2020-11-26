// App
const app = express();

const csrf = require('csurf');

// Security configuration
const csrfMiddleware = csrf({ cookie: true })

app.use(csrfMiddleware)
app.use(cors());

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
})