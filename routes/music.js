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

// GET ONE MUSIC
router.get("/:musicId", async (req, res, next) => {
  try {
    const result = await Music.findById(req.params.musicId);
    res.status(200).json(result);
  } catch (err) {
    next({ message: "Music Not Found", status: 404 });
  }
});

// UPDATE MUSIC
router.put("/update/:musicId", async (req, res, next) => {
  try {
    const result = await Music.findByIdAndUpdate(req.params.musicId, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (err) {
    next({ message: "Music Not Found!", status: 404 });
  }
});

module.exports = router;
