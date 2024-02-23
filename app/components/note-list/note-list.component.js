import NoteItem from "../note-item/note-item.component.js";
import template from "./note-list.template.js";

class NoteList extends HTMLElement {
  #noteElements = [];

  constructor() {
    super();
    const clone = document.importNode(template.content, true);
    this.listNode = clone.querySelector(".note__list");

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
    noteItem.setAttribute("note-archived", note.archived);

    this.#noteElements.push(noteItem);
    this.listNode.append(noteItem);
  }

  render(notes, searchQuery) {
    this.listNode.innerHTML = "";

    if (searchQuery?.length && notes.length <= 0) {
      this.listNode.innerHTML = `<p>No note with keyword: "${searchQuery}" found</p>`;
      return;
    }

    notes.forEach(this.insertNote);
  }
}
customElements.define("note-list", NoteList);

export default NoteList;
