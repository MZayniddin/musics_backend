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

// REMOVE MUSIC
router.delete("/destroy/:musicId", async (req, res, next) => {
  try {
    const result = await Music.findOneAndRemove({ _id: req.params.musicId });
    if (!result) {
      next({ message: "Music Not Found!", status: 404 });
    } else {
      res.json(result);
    }
  } catch {
    next({ message: "Music Not Found!", status: 404 });
  }
});

// MUSIC BETWEEN TWO YEARS
router.get("/between/:start_year/:end_year", async (req, res, next) => {
  try {
    const { start_year, end_year } = req.params;
    const result = await Music.find({
      year: { $gte: parseInt(start_year), $lte: parseInt(end_year) },
    });
    res.json(result);
  } catch {
    next({ message: "Music Not Found!", status: 404 });
  }
});

module.exports = router;
