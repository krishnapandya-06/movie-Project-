const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movieDB')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));