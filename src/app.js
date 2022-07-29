const express = require('express');
const { errors } = require('celebrate');
require('dotenv').config();
const questions = require('./routes/questions');
const users = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/api/v1/questions', questions);
app.use('/api/v1/users', users);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(errors());

module.exports = app;
