const bookRoutes = require("express").Router();
const bookData = require("../books.json");
const { check, validationResult } = require("express-validator");
const { save } = require("../services/save.service");

bookRoutes.get("/", (req, res) => {
  res.json(bookData);
});

bookRoutes.post(
  "/",
  [
    check("name", "Book name is required").not().isEmpty(),
    check("author", "Author name is required").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    bookData.push({
      name: req.body.name,
      author: req.body.author,
      id: Math.random(),
    });

    const isSaved = save(bookData);
    if (!isSaved) {
      return res.status(500).json({
        error: true,
        message: "could not save book",
      });
    }

    res.json({
      message: "Success",
    });
  }
);

bookRoutes.put("/:bookId", (req, res) => {
  const { bookId } = req.params;
  const { name, author } = req.body;

  const foundBook = bookData.find((book) => book.id == bookId);

  if (!foundBook) {
    return res.status(404).send({
      error: true,
      message: "Book not found",
    });
  }

  let updatedBook = null;

  const updatedBooks = bookData.map((book) => {
    if (!book.id == bookId) {
      updatedBook = {
        ...book,
        name,
        author,
      };

      return updatedBook;
    }
    return book;
  });

  const isSaved = save(bookData);
  if (!isSaved) {
    return res.status(500).json({
      error: true,
      message: "could not save book",
    });
  }
  //WORKING HERE 1:12:35
  res.status(201).json(updatedBook);
});

module.exports = bookRoutes;
