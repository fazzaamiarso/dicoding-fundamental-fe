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
    this.search = document.querySelector("#search");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);

    this.addNote = this.addNote.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.keyBindingHandler = this.keyBindingHandler.bind(this);
  }

  addNote(event) {
    const newNote = {
      id: +new Date(),
      createdAt: new Date().toISOString(),
      ...event.detail,
    };
    this.#data.push(newNote);
    this.noteList.render(this.#data);
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
        ? this.#data
        : this.#data.filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
    this.noteList.render(searchedData, searchQuery);
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

  connectedCallback() {
    this.noteList.render(this.#data);
    this.noteForm.addEventListener("add-note", this.addNote);
    this.noteDialog.addEventListener("close-dialog", this.closeDialog);
    this.dialogButton.addEventListener("click", this.openDialog);
    this.search.addEventListener("input", this.searchNotes);

    document.addEventListener("keydown", this.keyBindingHandler);
  }
}

customElements.define("note-app", NoteApp);

export default NoteApp;
