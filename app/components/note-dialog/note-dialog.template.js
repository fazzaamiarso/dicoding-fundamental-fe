const template = document.createElement("template");

template.id = "note-dialog-template";
template.innerHTML = `
    <style>
      dialog {
        outline: none;
        border: none;
        width: min(500px, 90%);

        border-radius: 3px;
      }
    </style>
    <dialog>
      <slot></slot>  
    </dialog>
`;

export default template;
