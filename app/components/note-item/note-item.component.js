import template from "./note-item.template.js";

class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["note-id", "note-title", "note-body"];
  }

  constructor() {
    super();

    const clone = document.importNode(template.content, true);
    this.container = clone.querySelector(".note-item");
    this.titleEl = clone.querySelector(".note-title");
    this.bodyEl = clone.querySelector(".note-body");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);
  }

  render() {
    this.titleEl.innerText = this["note-title"];
    this.bodyEl.innerText = this["note-body"];
  }

  attributeChangedCallback(props, oldVal, newVal) {
    if (oldVal === newVal) return;
    this[props] = newVal;

    this.render();
  }
}
customElements.define("note-item", NoteItem);

export default NoteItem;
