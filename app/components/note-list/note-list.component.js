import NoteItem from "../note-item/note-item.component.js";
import template from "./note-list.template.js";

class NoteList extends HTMLElement {
  #noteElements = [];

  constructor() {
    super();
    const clone = document.importNode(template.content, true);
    this.listNode = clone.querySelector(".note-list");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);

    this.insertNote = this.insertNote.bind(this);
  }

  insertNote(note) {
    const noteItem = new NoteItem();
    noteItem.setAttribute("note-id", note.id);
    noteItem.setAttribute("note-title", note.title);
    noteItem.setAttribute("note-body", note.body);
    noteItem.setAttribute("note-created-at", note.createdAt);

    this.#noteElements.push(noteItem);
    this.listNode.append(noteItem);
  }

  insertNotes(notes) {
    notes.forEach(this.insertNote);
  }
}
customElements.define("note-list", NoteList);

export default NoteList;
