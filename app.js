const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const movieRoutes = require('./routes/movies');
const indexRoutes = require('./routes/index');
const app = express();

require('./config/database');

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/', movieRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));