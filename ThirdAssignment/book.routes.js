const express = require('express')
const router = express.Router()
const book = require('./book.model')
const m = require('./book.helper')



/* All books */
router.get('/', async (req, res) => {
    await book.getBooks()
    .then(books => res.json(books))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A book by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await book.getBook(id)
    .then(book => res.json(book))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new book */
router.post('/', async (req, res) => {
    await book.insertBook(req.body)
    .then(book => res.status(201).json({
        message: `The book #${book.id} has been created`,
        content: book
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a book */
router.put('/:id', async (req, res) => {
    const id = req.params.id
    await book.updateBook(id, req.body)
    .then(book => res.json({
        message: `The book #${id} has been updated`,
        content: book
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


/* Delete a book */
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    await book.deleteBook(id)
    .then(book => res.json({
        message: `The book #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})
module.exports = router