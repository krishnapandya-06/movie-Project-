const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.render('index', { movies });
});

router.get('/movie/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render('details', { movie });
});

module.exports = router;
