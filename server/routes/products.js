const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const response = await fetch(
      `https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await fetch(`https://fakestoreapi.in/api/products/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/category/:type", async (req, res, next) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.in/api/products/category?type=${req.params.type}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
