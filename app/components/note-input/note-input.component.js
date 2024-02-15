import template from "./note-input.template.js";

class NoteInput extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const clone = document.importNode(template.content, true);
    this.form = clone.querySelector("form");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(clone);
  }

  connectedCallback() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.currentTarget);

      this.dispatchEvent(
        new CustomEvent("add-note", {
          detail: {
            title: formData.get("title-input"),
            body: formData.get("body-input"),
          },
        })
      );
    });
  }
}
customElements.define("note-input", NoteInput);

export default NoteInput;
