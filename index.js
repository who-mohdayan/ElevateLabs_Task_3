const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// In-memory book list
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Add a new book
app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json({ message: "Book added successfully!", book: newBook });
});

// Update a book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  let index = books.findIndex(book => book.id === bookId);
  
  if (index !== -1) {
    books[index] = updatedBook;
    res.json({ message: "Book updated!", book: updatedBook });
  } else {
    res.status(404).json({ error: "Book not found!" });
  }
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.json({ message: "Book deleted!" });
});

app.listen(port, () => {
  console.log(`📚 Book API server running on http://localhost:${port}`);
});
