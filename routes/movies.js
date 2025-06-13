const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Movie = require('../models/Movie');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', upload.single('image'), async (req, res) => {
  const { name, releaseDate, type, genre, description, rating, review, cast } = req.body;
  const image = req.file ? req.file.filename : '';
  const newMovie = new Movie({ name, releaseDate, type, image, genre, description, rating, review, cast });
  await newMovie.save();
  res.redirect('/');
});

module.exports = router;