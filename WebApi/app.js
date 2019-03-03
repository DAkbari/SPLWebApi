let express = require('express');
let cors = require('cors')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
var log = require('./core/middlewares/log');

let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');

let authRouter = require('./routes/auth');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let termRouter = require('./routes/term');
let entityRouter = require('./routes/entity');
let splRouter = require('./routes/spl');
let algorithmRouter = require('./routes/algorithm');

let app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(log);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/term', termRouter);
app.use('/api/v1/entity', entityRouter);
app.use('/api/v1/spl', splRouter);
app.use('/api/v1/algorithm', algorithmRouter);

module.exports = app;

