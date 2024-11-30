const { prisma } = require('../prisma/prisma-client')
const { ERROR_MESSAGES } = require('./constants')

/**
 * @route GET /api/notes/
 * @desc Get all active notes
 * @access Private
 */
const getNotes = async (req, res) => {
  const {
    user: { id: userId = null },
  } = req

  try {
    const notes = await prisma.note.findMany({
      where: {
        userId,
        isArchived: false,
      },
      select: {
        id: true,
        title: true,
        text: true,
        createdAt: true,
        updatedAt: true,
        isArchived: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.status(200).json(notes)
  } catch (error) {
    console.error(ERROR_MESSAGES.notesNotFound, error)
    res.status(500).json({ error: ERROR_MESSAGES.serverError })
  }
}

/**
 * @route GET /api/notes/:id
 * @desc Get note
 * @access Private
 */
const getNote = async (req, res) => {
  const {
    user: { id: userId = null },
    params: { id: noteId },
  } = req

  try {
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
      select: {
        id: true,
        title: true,
        text: true,
        createdAt: true,
        updatedAt: true,
        isArchived: true,
      },
    })

    if (!note) {
      return res.status(404).json({ error: ERROR_MESSAGES.noteNotFound })
    }

    res.status(200).json(note)
  } catch (error) {
    console.error(ERROR_MESSAGES.noteNotFound, error)
    res.status(500).json({ error: ERROR_MESSAGES.serverError })
  }
}

/**
 * @route POST /api/notes/
 * @desc Create note
 * @access Private
 */
const createNote = async (req, res) => {
  const {
    body: { title = null, text = null },
    user: { id: userId = null },
  } = req

  if (!text) {
    return res.status(400).json({
      error: ERROR_MESSAGES.noteTextRequired,
    })
  }

  try {
    const note = await prisma.note.create({
      data: {
        userId,
        title: title,
        text: text,
        isArchived: false,
      },
    })

    res.status(201).json(note)
  } catch (error) {
    console.error(ERROR_MESSAGES.noteNotCreated, error)
    res.status(500).json({ error: ERROR_MESSAGES.serverError })
  }
}

/**
 * @route PUT /api/notes/:id
 * @desc Update note
 * @access Private
 */
const updateNote = async (req, res) => {
  const {
    user: { id: userId = null },
    params: { id: noteId },
    body: { title = null, text = null },
  } = req

  if (!text) {
    return res.status(400).json({ error: ERROR_MESSAGES.noteTextRequired })
  }

  try {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
    })

    if (!note || note.userId !== userId) {
      return res.status(404).json({ error: ERROR_MESSAGES.noteNotFound })
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { title, text },
    })

    res.status(200).json(updatedNote)
  } catch (error) {
    console.error(ERROR_MESSAGES.noteNotUpdated, error)
    res.status(500).json({ error: ERROR_MESSAGES.serverError })
  }
}

/**
 * @route PATCH /api/notes/:id
 * @desc Archive note
 * @access Private
 */
const toggleArchiveNote = async (req, res) => {
  const {
    user: { id: userId = null },
    params: { id: noteId },
  } = req

  try {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
    })

    if (!note || note.userId !== userId) {
      return res.status(404).json({ error: ERROR_MESSAGES.noteNotFound })
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { isArchived: !note.isArchived },
    })

    res.status(200).json(updatedNote)
  } catch (error) {
    console.error(ERROR_MESSAGES.noteNotArchived, error)
    res.status(500).json({ error: ERROR_MESSAGES.serverError })
  }
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  toggleArchiveNote,
  updateNote,
}
