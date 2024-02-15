import template from "./note-app.template.js";
import notes from "../../data.js";

class NoteApp extends HTMLElement {
  #data = [];

  constructor() {
    super();
    this.#data = notes;

    const clone = document.importNode(template.content, true);
    this.noteList = clone.querySelector("note-list");
    this.noteInput = clone.querySelector("note-input");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);

    this.addNote = this.addNote.bind(this);
  }

  addNote(event) {
    const newNote = {
      id: +new Date(),
      ...event.detail,
    };
    this.#data.push(newNote);
    this.noteList.insertNote(newNote);
  }

  connectedCallback() {
    this.noteList.insertNotes(this.#data);
    this.noteInput.addEventListener("add-note", this.addNote);
  }
}

customElements.define("note-app", NoteApp);

export default NoteApp;
