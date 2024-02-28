const template = document.createElement("template");

template.id = "note-dialog-template";
template.innerHTML = `
    <style>
      dialog {
        display: grid;
        outline: none;
        border: none;
        
        width: min(500px, 90%);
        border-radius: 8px;

        transform: scale(1);
        transition: all .2s ease-out;
      }

      dialog:not([open]) {
        pointer-events: none;
        opacity: 0;
        transform: scale(.9);
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
