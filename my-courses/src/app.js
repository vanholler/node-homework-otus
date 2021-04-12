const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

require('./config/passport')(passport);

const { mode } = require('./config');
const index = require('./routes/index');
const courses = require('./routes/courses');
const users = require('./routes/users');
const lessons = require('./routes/lessons');
const auth = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const hbsHelpers = require('./helpers/hbs');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

if (mode === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

app.use(cors());

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbsHelpers }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: 'secret', // you should choose a unique value here
    resave: false, // forces the session to be saved back to the session store
    saveUninitialized: false, // forces a session that is “uninitialized” to be saved to the store
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

// PASS
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static('public'));

app.use('/', index);
app.use(auth);
app.use(courses);
app.use(lessons);
app.use(users);

app.use((req, res, next) => {
  res.status(404);
  if (req.headers['content-type'] === 'application/json') {
    res.send({ error: 'Not found' });
  } else {
    res.render('404', { url: req.url });
  }
});

app.use(errorHandler);

module.exports = app;
