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

module.exports = router;
