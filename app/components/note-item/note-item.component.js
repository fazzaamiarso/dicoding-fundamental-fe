import { getShortDay } from "../../utils.js";
import template from "./note-item.template.js";
import EventBus from "../../utils/event-bus.js";

const archiveIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>`;

const unarchiveIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>
`;

class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return [
      "note-id",
      "note-title",
      "note-body",
      "note-created-at",
      "note-archived",
    ];
  }

  constructor() {
    super();

    this["note-id"] = this.getAttribute("note-id");
    this["note-title"] = this.getAttribute("note-title");
    this["note-body"] = this.getAttribute("note-body");
    this["note-created-at"] = this.getAttribute("note-created-at");
    this["note-archived"] = this.getAttribute("note-archived");

    const clone = document.importNode(template.content, true);
    this.container = clone.querySelector(".note");
    this.titleEl = clone.querySelector(".note__title");
    this.bodyEl = clone.querySelector(".note__body");
    this.dateEl = clone.querySelector(".note__date");
    this.shortDayEl = clone.querySelector(".note__shortday");
    this.timeEl = clone.querySelector(".note__time");
    this.deleteEl = clone.querySelector(".note__delete");
    this.archiveEl = clone.querySelector(".note__archive");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(clone);

    this.deleteNote = this.deleteNote.bind(this);
    this.toggleArchive = this.toggleArchive.bind(this);
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
      case "note-archived":
        this.archiveEl.innerHTML =
          this["note-archived"] === "true" ? unarchiveIcon : archiveIcon;
        break;
      case "note-created-at":
        const date = new Date(this["note-created-at"]);
        const shortDay = getShortDay(date.getDay());
        this.timeEl.textContent = getTimeString(date);
        this.dateEl.textContent = date.getDate().toString().padStart(2, 0);
        this.shortDayEl.textContent = shortDay;
    }
  }

  toggleArchive() {
    const dispatchedEvent =
      this["note-archived"] === "true" ? "unarchive-note" : "archive-note";

    EventBus.dispatch(dispatchedEvent, this["note-id"]);
  }

  deleteNote() {
    EventBus.dispatch("delete-note", this["note-id"]);
  }

  attributeChangedCallback(props, oldVal, newVal) {
    if (oldVal === newVal) return;

    this[props] = newVal;
    this.updateElements(props);
  }

  connectedCallback() {
    this.deleteEl.addEventListener("click", this.deleteNote);
    this.archiveEl.addEventListener("click", this.toggleArchive);
  }

  disconnectedCallback() {
    this.archiveEl.removeEventListener("click", this.deleteNote);
    this.deleteEl.removeEventListener("click", this.toggleArchive);
  }
}
customElements.define("note-item", NoteItem);

export default NoteItem;
