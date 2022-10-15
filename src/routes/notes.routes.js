const { Router } = require("express")

const router = Router()
const notesCtrl = require("../controllers/notes.controller")
const { isAuthenticated } = require("../helpers/auth")

router.get("/notes/add", isAuthenticated, notesCtrl.renderNoteForm)

router.post("/notes/new-note", isAuthenticated, notesCtrl.createNewNote)

router.get("/notes", isAuthenticated, notesCtrl.renderNotes)

router.get("/notes/edit/:id", isAuthenticated, notesCtrl.renderEditForm)

router.put("/notes/edit/:id", isAuthenticated, notesCtrl.updateNote)

router.delete("/notes/delete/:id", isAuthenticated, notesCtrl.deleteNote)

module.exports = router
