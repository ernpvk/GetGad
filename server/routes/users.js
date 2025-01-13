const express = require("express");
const router = express.Router();

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const response = await fetch(`https://fakestoreapi.in/api/users?page=${page}&limit=${limit}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get single user
router.get("/:id", async (req, res, next) => {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/users/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
