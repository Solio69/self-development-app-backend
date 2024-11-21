const express = require('express')
const colors = require('colors')
const { auth } = require('../middleware/auth')
const router = express.Router()
const { getNotes, getNote, createNote } = require('../controllers/notes')

// ./api/notes/
router.get('/', auth, getNotes)

// ./api/notes/:id
router.get('/:id', auth, getNote)

// ./api/notes/
router.post('/', auth, createNote)

// ./api/notes/:id
router.put('/:id', auth, () => {
  console.log(colors.red.bold('update'))
})

// ./api/notes/:id
router.put('/:id', auth, () => {
  console.log(colors.red.bold('archive'))
})

// ./api/notes/:id
router.delete('/:id', auth, () => {
  console.log(colors.red.bold('delete'))
})

module.exports = router
