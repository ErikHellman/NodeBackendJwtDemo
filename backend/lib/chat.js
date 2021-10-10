var express = require('express');
var auth = require("./auth");
var router = express.Router();
var {Message, User} = require('./db')

router.get('/', auth, async (req, res, next) => {
  const messages = await Message.find({}).sort('created');
  res.json(messages);
});

router.post('/', auth, async (req, res, next) => {
  const message = new Message(req.body);
  const newMessage = await message.save();
  res.json(newMessage);
});

module.exports = router;
