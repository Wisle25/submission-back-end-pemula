const { postBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookIdHandler } = require('./handler')

const routes = [
  // KRITERIA 1
  {
    method: 'POST',
    path: '/books',
    handler: postBookHandler
  },
  // KRITERIA 2
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler
  },
  // KRITERIA 3
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler
  },
  // KRITERIA 4
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler
  },
  // KRITERIA 5
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookIdHandler
  }
]

module.exports = routes
