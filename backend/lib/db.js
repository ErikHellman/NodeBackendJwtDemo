const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/chat')
    .then((db) => { console.log('Successfully connected to MongoDB!'); })
    .catch((error) => { console.error('Failed to connect to MongoDB!', error); });

const Message = new mongoose.model('Message', {
    content: String,
    author: String,
    posted: { type: Date, default: Date.now },
});

const User = new mongoose.model('User', {
    userName: String,
    password: String
});

module.exports = {Message, User};
