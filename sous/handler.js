/* eslint-disable eol-last */
const { nanoid } = require('nanoid')
const books = require('./books')

// KRITERIA 1
const postBookHandler = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload

  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const postBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  books.push(postBook)
  const isSuccess = books.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

// KRITERIA 2
const getAllBookHandler = (req, h) => {
  const { name, finished, reading } = req.query

  if (name === undefined && reading === undefined && finished === undefined) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })
    response.code(200)
    return response
  }

  if (name) {
    const filtName = books.filter((book) => {
      const reg = new RegExp(name, 'gi')
      return reg.test(book.name)
    })
    const response = h.response({
      status: 'success',
      data: {
        books: filtName.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })
    response.code(200)
    return response
  }

  if (reading) {
    const filtRead = books.filter((book) => Number(book.reading) === Number(reading))
    const response = h.response({
      status: 'success',
      data: {
        books: filtRead.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    })
    response.code(200)
    return response
  }

  const filtFinish = books.filter((book) => Number(book.finished) === Number(finished))
  const response = h.response({
    status: 'success',
    data: {
      books: filtFinish.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  response.code(200)
  return response
}

// KRITERIA 3
const getBookByIdHandler = (req, h) => {
  const { bookId } = req.params

  const book = books.filter((b) => b.id === bookId)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

// KRITERIA 4
const editBookByIdHandler = (req, h) => {
  const { bookId } = req.params

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload
  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === bookId)

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookIdHandler = (req, h) => {
  const { bookId } = req.params

  const index = books.findIndex((book) => book.id === bookId)
  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { postBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookIdHandler }