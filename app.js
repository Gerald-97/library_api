var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var dotenv = require('dotenv').config();
var expressValidator = require('express-validator');

mongoose.connect(process.env.DATABASE_URL);

var indexRouter = require('./routes/index');
var bookRouter = require('./routes/books');

var app = express();
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', bookRouter);

module.exports = app;
