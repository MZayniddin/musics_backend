const express = require("express");
const router = express.Router();

// ADD MUSIC POST METHOD
router.post("/", (req, res) => {
  const { title } = req.body;
  res.json(title)
});

module.exports = router;
