import { getShortDay } from "../../utils.js";
import template from "./note-item.template.js";

class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["note-id", "note-title", "note-body", "note-created-at"];
  }

  constructor() {
    super();

    this["note-id"] = this.getAttribute("note-id");
    this["note-title"] = this.getAttribute("note-title");
    this["note-body"] = this.getAttribute("note-body");
    this["note-created-at"] = this.getAttribute("note-created-at");

    const clone = document.importNode(template.content, true);
    this.container = clone.querySelector(".note");
    this.titleEl = clone.querySelector(".note__title");
    this.bodyEl = clone.querySelector(".note__body");
    this.dateEl = clone.querySelector(".note__date");
    this.shortDayEl = clone.querySelector(".note__shortday");
    this.timeEl = clone.querySelector(".note__time");
    this.deleteEl = clone.querySelector(".note__delete");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(clone);

    this.deleteNote = this.deleteNote.bind(this);
  }

  updateElements(props) {
    const getTimeString = (date) => {
      const hours = date.getHours().toString().padStart(2, 0);
      const minutes = date.getMinutes().toString().padStart(2, 0);
      return `${hours}:${minutes}`;
    };

    switch (props) {
      case "note-title":
        this.titleEl.textContent = this["note-title"];
        break;
      case "note-body":
        this.bodyEl.textContent = this["note-body"];
        break;
      case "note-created-at":
        const date = new Date(this["note-created-at"]);
        const shortDay = getShortDay(date.getDay() - 1);
        this.timeEl.textContent = getTimeString(date);
        this.dateEl.textContent = date.getDate().toString().padStart(2, 0);
        this.shortDayEl.textContent = shortDay;
    }
  }

  deleteNote() {
    this.dispatchEvent(
      new CustomEvent("delete-note", {
        detail: this["note-id"],
        bubbles: true,
        composed: true,
      })
    );
  }

  attributeChangedCallback(props, oldVal, newVal) {
    if (oldVal === newVal) return;

    this[props] = newVal;
    this.updateElements(props);
  }

  connectedCallback() {
    this.deleteEl.addEventListener("click", this.deleteNote);
  }

  disconnectedCallback() {
    this.deleteEl.removeEventListener("click", this.deleteNote);
  }
}
customElements.define("note-item", NoteItem);

export default NoteItem;
