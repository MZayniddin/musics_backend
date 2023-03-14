const express = require("express");
const mongoose = require("mongoose");
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

// GET MUSIC BY AUTHOR ID
router.get("/:author_id", async (req, res) => {
  try {
    const result = await Author.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.author_id),
        },
      },
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
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// UPDATE AUTHOR BY ID
router.put("/update/:author_id", async (req, res) => {
  try {
    const result = await Author.findByIdAndUpdate(
      req.params.author_id,
      req.body,
      {
        new: true,
      }
    );
    res.json(result);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
