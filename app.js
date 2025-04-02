require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var todosRouter = require('./routes/todos');
var db = require('./models');

var app = express();


//Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API Documentation',
    version: '1.0.0',
    description: 'API documentation for the Todo application',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/category', categoriesRouter);
app.use('/todos', todosRouter);

// Sync database and insert initial statuses
db.sequelize.sync({ force: false })
  .then(() => {
    const statuses = [
      { id: 1, status: 'Not Started' },
      { id: 2, status: 'Started' },
      { id: 3, status: 'Completed' },
      { id: 4, status: 'Deleted' },
    ];
    return Promise.all(
      statuses.map(s => 
        db.Status.findOrCreate({
          where: { id: s.id },
          defaults: { status: s.status },
        })
      )
    );
  })
  .then(() => {
    console.log('Database synchronized and statuses seeded.');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    status: "error",
    result: err.message
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;