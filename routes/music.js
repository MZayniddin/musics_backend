const express = require("express");
const router = express.Router();

// MODEL
const Music = require("../models/Music");

// GET ALL MUSICS
router.get("/all", async (req, res) => {
  try {
    const result = await Music.find();
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
});

// ADD MUSIC POST METHOD
router.post("/create", (req, res) => {
  try {
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
  } catch (err) {
    res.send(err.message);
  }
});


module.exports = router;
