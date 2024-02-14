class NoteItem extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("note-item").content;
    this.appendChild(template.cloneNode(true));
  }
}

customElements.define("note-item", NoteItem);
