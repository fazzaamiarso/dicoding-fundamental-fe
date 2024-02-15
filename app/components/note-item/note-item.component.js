import template from "./note-item.template.js";

class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["note-id", "note-title", "note-body"];
  }

  constructor() {
    super();

    this["note-id"] = this.getAttribute("note-id");
    this["note-title"] = this.getAttribute("note-title");
    this["note-body"] = this.getAttribute("note-body");

    const clone = document.importNode(template.content, true);
    this.container = clone.querySelector(".note-item");
    this.titleEl = clone.querySelector(".note-title");
    this.bodyEl = clone.querySelector(".note-body");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(clone);
  }

  attributeChangedCallback(props, oldVal, newVal) {
    if (oldVal === newVal) return;

    this[props] = newVal;

    if (props === "note-title") {
      this.titleEl.innerText = this["note-title"];
    }

    if (props === "note-body") {
      this.bodyEl.innerText = this["note-body"];
    }
  }
}
customElements.define("note-item", NoteItem);

export default NoteItem;
