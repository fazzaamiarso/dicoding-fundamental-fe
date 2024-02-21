const template = document.createElement("template");

template.id = "note-dialog-template";
template.innerHTML = `
    <style>
      dialog {
        outline: none;
        border: none;
        width: min(500px, 90%);

        border-radius: 8px;
      }

      dialog:not([open]) {
        pointer-events: none;
        opacity: 0;
      }

      html:has(dialog[open][modal-mode="mega"]) {
        overflow: hidden;
      }
    </style>
    <dialog>
      <slot></slot>  
    </dialog>
`;

export default template;
