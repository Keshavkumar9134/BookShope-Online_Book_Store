const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// CREATE
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// READ
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

//get by :id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: "Invalid book ID" });
  }
});


// UPDATE
router.put("/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

module.exports = router;
