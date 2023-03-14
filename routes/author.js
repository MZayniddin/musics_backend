const express = require("express");
const router = express.Router();

// MODEL
const Author = require("../models/Author");

// ADD AUTHOR
router.post("/create", (req, res) => {
  try {
    const author = new Author(req.body);
    author.save().then((result) => res.json(result));
  } catch (err) {
    res.json({ message: err.message });
  }
});

// GET AUTHORS WITH MISUC
router.get("/", async (req, res) => {
  const result = await Author.aggregate([
    {
      $lookup: {
        from: "musics",
        localField: "_id",
        foreignField: "author_id",
        as: "musics", // give name
      },
    },
    {
      $unwind: {
        path: "$musics", // given name
        preserveNullAndEmptyArrays: true
      },
    },
  ]);
  res.json(result);
});

module.exports = router;
