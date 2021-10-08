require('dotenv').config()
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var chatRouter = require('./lib/chat');

var app = express();

app.use(logger(process.env.ENV || 'dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/chat', chatRouter);

module.exports = app;
