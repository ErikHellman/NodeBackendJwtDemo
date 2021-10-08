var express = require('express');
var router = express.Router();
var {Message, User} = require('./db')
const mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
  const messages = await Message.find({}).sort('created');
  res.json(messages);
});

router.post('/', async (req, res, next) => {
  const message = new Message(req.body);
  const newMessage = await message.save();
  res.json(newMessage);
});

module.exports = router;
