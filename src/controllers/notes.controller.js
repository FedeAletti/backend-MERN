const Note = require("../models/Note")

const notesCtrl = {
	renderNoteForm: (req, res) => {
		res.render("notes/new-note")
	},

	createNewNote: async (req, res) => {
		const { title, description } = req.body

		const newNote = new Note({ title, description })
		newNote.user = req.user.id
		await newNote.save()
		req.flash("success_msg", "Note Added Successfully")
		res.redirect("/notes")
	},

	renderNotes: async (req, res) => {
		const notes = await Note.find({ user: req.user.id })
			.sort({ createdAt: "desc" })
			.lean()

		res.render("notes/all-notes", { notes })
	},

	renderEditForm: async (req, res) => {
		const note = await Note.findById(req.params.id).lean()
		if (note.user != req.user.id) {
			req.flash("error_msg", "Not Authorized")
			return res.redirect("/notes")
		}
		res.render("notes/edit-note", { note })
	},

	updateNote: async (req, res) => {
		const { title, description } = req.body
		await Note.findByIdAndUpdate(req.params.id, { title, description })
		req.flash("success_msg", "Note Updated Successfully")
		res.redirect("/notes")
	},

	deleteNote: async (req, res) => {
		const { id } = req.params

		if (id) {
			const note = await Note.findById(req.params.id).lean()
			if (note.user != req.user.id) {
				req.flash("error_msg", "Not Authorized")
				return res.redirect("/notes")
			}
			await Note.findByIdAndDelete(id)
			req.flash("success_msg", "Note Deleted Successfully")
			res.redirect("/notes")
		}
	},
}

module.exports = notesCtrl
