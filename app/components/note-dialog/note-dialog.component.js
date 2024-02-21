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

  // clicking on backdrop
  lightDissmis({ target: dialog }) {
    if (dialog.nodeName === "DIALOG") {
      dialog.close("dismiss");
    }
  }

  connectedCallback() {
    this.dialog.addEventListener("click", this.lightDissmis);
  }
}

customElements.define("note-dialog", NoteDialog);

export default NoteDialog;
