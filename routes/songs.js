'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Song = require('../models/song');

router.get('/', function(req, res) {
  Song.find( function(err, songs) {
    res.json(songs);
  });
});

router.post('/', function(req, res) {
    let { title, artist, lyrics } = req.body;
  new Song({
    title,
    artist,
    lyrics
  }).save( function(err, song) {
    res.json(song);
  });
});

router.get('/:id', (req, res) => {
  Song.findById(req.params.id, (err, song) => {
    res.json(song);
  });
});

module.exports = router;
