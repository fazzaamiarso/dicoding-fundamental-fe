import template from "./note-app.template.js";
import * as NoteService from "../../service/note-service.js";

class NoteApp extends HTMLElement {
  static get observedAttributes() {
    return ["notes", "loading"];
  }

  constructor() {
    super();

    const clone = document.importNode(template.content, true);

    this.noteList = clone.querySelector("note-list");
    this.noteForm = clone.querySelector("note-input");
    this.noteDialog = clone.querySelector("note-dialog");
    this.dialogButton = clone.querySelector(".app__button--add");
    this.search = document.querySelector("#search");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.archiveNote = this.archiveNote.bind(this);
    this.unArchiveNote = this.unArchiveNote.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.keyBindingHandler = this.keyBindingHandler.bind(this);
  }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }

  set loading(v) {
    return this.setAttribute("loading", JSON.stringify(v));
  }

  get notes() {
    return JSON.parse(this.getAttribute("notes"));
  }

  set notes(v) {
    return this.setAttribute("notes", JSON.stringify(v));
  }

  async addNote(event) {
    const newNote = {
      ...event.detail,
    };

    try {
      const res = await NoteService.createNote(newNote);
      if (!res.ok) {
        throw new Error("Failed to add new notes!");
      }

      await this.fetchAllNotes();
    } catch (e) {
      console.error(e.message);
    }

    this.closeDialog();
  }

  async deleteNote(event) {
    try {
      const res = await NoteService.deleteNote({ id: event.detail });
      if (!res.ok) {
        throw new Error("Failed to delete notes!");
      }
      await this.fetchAllNotes();
    } catch (e) {
      console.error(e.message);
    }
  }

  async archiveNote(event) {
    try {
      const res = await NoteService.archiveNote({ id: event.detail });
      if (!res.ok) {
        throw new Error("Failed to archive notes!");
      }

      await this.fetchAllNotes();
    } catch (e) {
      console.error(e.message);
    }
  }

  async unArchiveNote(event) {
    try {
      const res = await NoteService.unArchiveNote({ id: event.detail });
      if (!res.ok) {
        throw new Error("Failed to unarchive notes!");
      }

      await this.fetchAllNotes();
    } catch (e) {
      console.error(e.message);
    }
  }

  openDialog() {
    this.noteDialog.open();
  }

  closeDialog() {
    this.noteDialog.close();
  }

  searchNotes(event) {
    const searchQuery = event.target.value;
    const searchedData =
      searchQuery.length <= 0
        ? this.notes
        : this.notes.filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
    this.noteList.render(searchedData, searchQuery);
  }

  async fetchAllNotes() {
    this.loading = true;
    try {
      const [activeNotesRes, archivedNotesRes] = await Promise.all([
        NoteService.getActiveNotes(),
        NoteService.getArchivedNotes(),
      ]);
      const [activeNotes, archivedNotes] = await Promise.all([
        activeNotesRes.json(),
        archivedNotesRes.json(),
      ]);

      this.notes = [...activeNotes.data, ...archivedNotes.data];
    } catch (e) {
      console.error(e.message);
    } finally {
      this.loading = false;
    }
  }

  keyBindingHandler(event) {
    const isMetaPressed = event.metaKey;
    const keyPressed = event.key.toLowerCase();

    if (isMetaPressed && keyPressed === "k") {
      this.search.focus();
    }

    if (isMetaPressed && keyPressed === "i") {
      this.openDialog();
    }
  }

  attributeChangedCallback() {
    if (this.loading) {
      this.noteList.renderLoader();
    } else {
      this.noteList.render(this.notes);
    }
  }

  async connectedCallback() {
    await this.fetchAllNotes();
    this.noteForm.addEventListener("add-note", async (e) => {
      await this.addNote(e);
    });
    this.noteDialog.addEventListener("close-dialog", this.closeDialog);
    this.dialogButton.addEventListener("click", this.openDialog);
    this.search.addEventListener("input", this.searchNotes);

    this.addEventListener("delete-note", this.deleteNote);
    this.addEventListener("archive-note", this.archiveNote);
    this.addEventListener("unarchive-note", this.unArchiveNote);
    document.addEventListener("keydown", this.keyBindingHandler);
  }
}

customElements.define("note-app", NoteApp);

export default NoteApp;
