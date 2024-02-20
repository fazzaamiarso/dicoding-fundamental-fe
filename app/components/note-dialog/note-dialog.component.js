import template from "./note-dialog.template.js";

class NoteDialog extends HTMLElement {
  constructor() {
    super();

    const clone = document.importNode(template.content, true);
    this.dialog = clone.querySelector("dialog");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.append(clone);
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close("cancel");
  }
}

customElements.define("note-dialog", NoteDialog);

export default NoteDialog;
