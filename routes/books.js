var express = require('express');
var router = express.Router();

const bookList = [
  {
    id: 1,
    name: "Bok1",
    loaned: false,
    pages: 75,
    author: "Greta Gris"
  },
  {
    id: 2,
    name: "Bok2",
    loaned: true,
    pages: 199,
    author: "Tim Sundell"
  },
  {
    id: 3,
    name: "Bok3",
    loaned: false,
    pages: 375,
    author: "Albert Einstein"
  },
];

/* GET users listing. */
router.get('/', function(request, response, next) {
  response.json(bookList);
});

router.post("/", function (req, res, next) {
  const addBook = {
    id: bookList.length + 1,
    name: req.body.name,
    author: req.body.author,
    pages: req.body.pages,
    loaned: false,
  };
  bookList.push(addBook);
  res.json(bookList);
});

router.get('/:bookId', function (request, response) {
  let bookId = request.params.bookId;
  let book = bookList.find(book => book.id === parseInt(bookId)); //eller book.id == bookId
  if (book) {
    response.json(book);
  } else {
    response.status(404).send('Hittar ej bok');
  }
});

router.post('/:bookId/rent', function(request, response) {
  let bookId = request.params.bookId;
  let book = bookList.find(book => book.id === parseInt(bookId)); //eller book.id == bookId
  book.loaned = !book.loaned;
  response.json(book); 
})
module.exports = router;
