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

router.get('/edit/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render('edit', { movie });
});

router.post('/edit/:id', upload.single('image'), async (req, res) => {
  const { name, releaseDate, type, genre, description, rating, review, cast } = req.body;
  const updateData = { name, releaseDate, type, genre, description, rating, review, cast };
  if (req.file) updateData.image = req.file.filename;
  await Movie.findByIdAndUpdate(req.params.id, updateData);
  res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
