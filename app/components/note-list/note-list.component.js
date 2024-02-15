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
  }

  insertNotes(items) {
    items.forEach((item) => {
      const noteItem = new NoteItem();
      noteItem.setAttribute("note-id", item.id);
      noteItem.setAttribute("note-title", item.title);
      noteItem.setAttribute("note-body", item.body);

      this.#noteElements.push(noteItem);
      this.listNode.append(noteItem);
    });
  }
}
customElements.define("note-list", NoteList);

export default NoteList;
