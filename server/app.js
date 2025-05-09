// app.js
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(
  session({
    secret:  process.env.SESSION_SECRET || 'default_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

// Conectar a MongoDB
connectDB();

// Rutas
const technologyRoutes = require('./routes/technologyRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/technologies', technologyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/auth', authRoutes);

module.exports = app;
