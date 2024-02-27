import EventBus from "../../event-bus.js";
import template from "./note-input.template.js";

class NoteInput extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const clone = document.importNode(template.content, true);
    this.focusableEls = clone.querySelectorAll("input, textarea");
    this.form = clone.querySelector("form");
    this.titleField = clone.querySelector("#title-input");
    this.bodyField = clone.querySelector("#body-input");
    this.cancelButton = clone.querySelector(".form__cancel");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(clone);

    this.submitHandler = this.submitHandler.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  resetFieldState() {
    this.titleField.value = "";
    this.bodyField.value = "";

    this.focusableEls.forEach(this.hideError);
  }

  setTitleConstraint(element) {
    element.setCustomValidity("");
    if (element.validity.valueMissing) {
      element.setCustomValidity("Title can't be empty!");
    }
  }

  setBodyConstraint(element) {
    element.setCustomValidity("");
    if (element.validity.valueMissing) {
      element.setCustomValidity("Body can't be empty!");
    }
  }

  validateTitle(element) {
    const isValid = element.validity.valid;
    if (isValid) this.hideError(element);
    else {
      this.setTitleConstraint(element);
      this.showError(element);
    }

    return isValid;
  }

  validateBody(element) {
    const isValid = element.validity.valid;
    if (isValid) this.hideError(element);
    else {
      this.setBodyConstraint(element);
      this.showError(element);
    }

    return isValid;
  }

  showError(element) {
    const errorEl = element.nextElementSibling;
    const errorMessage = element.validationMessage;

    if (errorEl && errorMessage) {
      element.classList.add("form__textfield--error");
      errorEl.textContent = errorMessage;
      errorEl.style.display = "block";
    }
  }

  hideError(element) {
    const errorEl = element.nextElementSibling;

    if (!errorEl) return;
    element.classList.remove("form__textfield--error");
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }

  submitHandler(evt) {
    evt.preventDefault();

    const isBodyValid = this.validateBody(this.bodyField);
    const isTitleValid = this.validateTitle(this.titleField);

    if (!isTitleValid || !isBodyValid) return;

    EventBus.dispatch("add-note", {
      title: this.titleField.value,
      body: this.bodyField.value,
    });

    this.resetFieldState();
  }

  closeDialog() {
    EventBus.dispatch("close-dialog");
  }

  connectedCallback() {
    this.form.addEventListener("submit", this.submitHandler);
    this.cancelButton.addEventListener("click", () => {
      this.resetFieldState();
      this.closeDialog();
    });

    const validationTriggerEvents = ["change"];
    validationTriggerEvents.forEach((eventTrigger) => {
      this.titleField.addEventListener(eventTrigger, (event) =>
        this.validateTitle(event.target),
      );
      this.bodyField.addEventListener(eventTrigger, (event) =>
        this.validateBody(event.target),
      );
    });
  }
}
customElements.define("note-input", NoteInput);

export default NoteInput;
