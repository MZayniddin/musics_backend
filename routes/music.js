const express = require("express");
const router = express.Router();

// MODEL
const Music = require("../models/Music");

// ADD MUSIC POST METHOD
router.post("/create", (req, res) => {
  // 1-WAY
  // const { title, category, country, year, spotify_score } = req.body;
  // const music = new Music({
  //   title,
  //   category,
  //   country,
  //   year,
  //   spotify_score,
  // });

  const music = new Music(req.body);
  music
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
