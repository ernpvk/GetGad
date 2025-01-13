const express = require("express");
const router = express.Router();

// Get user info
router.get("/:id", async (req, res, next) => {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/users/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Add new user
router.post("/", async (req, res, next) => {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Edit user's info
router.put("/:id", async (req, res, next) => {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/users/${req.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Delete account
router.delete("/:id", async (req, res, next) => {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/users/${req.params.id}`, {
      method: "POST",
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
