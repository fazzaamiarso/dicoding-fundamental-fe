import autoAnimate from "@formkit/auto-animate";
import NoteItem from "../note-item/note-item.component.js";
import template from "./note-list.template.js";

class NoteList extends HTMLElement {
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

    this.listNode.append(noteItem);
  }

  connectedCallback() {
    autoAnimate(this.listNode);
  }

  renderLoader() {
    this.listNode.innerHTML = "<p>Loading notes..</p>";
  }

  renderEmpty() {
    this.listNode.innerHTML = "<p>No notes found!</p>";
  }

  renderSearchEmpty(query) {
    this.listNode.innerHTML = `<p>No note with keyword: "${query}" found</p>`;
  }

  render(notes, searchQuery) {
    this.listNode.innerHTML = "";

    if (searchQuery?.length && notes.length <= 0) {
      this.renderSearchEmpty(searchQuery);
      return;
    }
    if (notes.length <= 0) {
      this.renderEmpty();
      return;
    }

    notes.forEach(this.insertNote);
  }
}
customElements.define("note-list", NoteList);

export default NoteList;
