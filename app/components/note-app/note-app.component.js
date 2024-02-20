import template from "./note-app.template.js";
import notes from "../../data.js";

class NoteApp extends HTMLElement {
  #data = [];

  constructor() {
    super();
    this.#data = notes;

    const clone = document.importNode(template.content, true);
    this.noteList = clone.querySelector("note-list");
    this.noteForm = clone.querySelector("note-input");
    this.noteDialog = clone.querySelector("note-dialog");
    this.dialogButton = clone.querySelector(".app__button--add");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);

    this.addNote = this.addNote.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  addNote(event) {
    const newNote = {
      id: +new Date(),
      createdAt: new Date().toISOString(),
      ...event.detail,
    };
    this.#data.push(newNote);
    this.noteList.insertNote(newNote);
  }

  openDialog() {
    this.noteDialog.open();
  }

  closeDialog() {
    this.noteDialog.close();
  }

  connectedCallback() {
    this.noteList.insertNotes(this.#data);
    this.noteForm.addEventListener("add-note", this.addNote);
    this.noteDialog.addEventListener("close-dialog", this.closeDialog);
    this.dialogButton.addEventListener("click", this.openDialog);
  }
}

customElements.define("note-app", NoteApp);

export default NoteApp;
