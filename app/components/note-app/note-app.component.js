import template from "./note-app.template.js";
import notes from "../../data.js";

class NoteApp extends HTMLElement {
  #data = [];

  constructor() {
    super();
    this.#data = notes;

    const clone = document.importNode(template.content, true);
    this.noteList = clone.querySelector("note-list");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);
  }

  connectedCallback() {
    this.noteList.insertNotes(this.#data);
  }
}

customElements.define("note-app", NoteApp);

export default NoteApp;
