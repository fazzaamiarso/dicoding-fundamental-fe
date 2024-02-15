import template from "./note-input.template.js";

class NoteInput extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const clone = document.importNode(template.content, true);
    this.form = clone.querySelector("form");
    this.titleField = clone.querySelector("#title-input");
    this.bodyField = clone.querySelector("#body-input");

    this._shadow = this.attachShadow({ mode: "open" });
    this._shadow.appendChild(clone);

    this.submitHandler = this.submitHandler.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  clearFields() {
    this.titleField.value = "";
    this.bodyField.value = "";
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
      errorEl.textContent = errorMessage;
      errorEl.style.display = "block";
    }
  }

  hideError(element) {
    const errorEl = element.nextElementSibling;

    if (!errorEl) return;
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }

  submitHandler(evt) {
    evt.preventDefault();

    const isTitleValid = this.validateTitle(this.titleField);
    const isBodyValid = this.validateBody(this.bodyField);

    if (!isTitleValid || !isBodyValid) return;

    this.dispatchEvent(
      new CustomEvent("add-note", {
        detail: {
          title: this.titleField.value,
          body: this.bodyField.value,
        },
      })
    );

    this.clearFields();
  }

  connectedCallback() {
    this.form.addEventListener("submit", this.submitHandler);
    const validationTriggerEvents = ["blur", "change"];
    validationTriggerEvents.forEach((eventTrigger) => {
      this.titleField.addEventListener(eventTrigger, (event) =>
        this.validateTitle(event.target)
      );
      this.bodyField.addEventListener(eventTrigger, (event) =>
        this.validateBody(event.target)
      );
    });
  }
}
customElements.define("note-input", NoteInput);

export default NoteInput;
