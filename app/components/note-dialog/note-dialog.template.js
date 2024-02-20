const template = document.createElement("template");

template.id = "note-dialog-template";
template.innerHTML = `
    <style>
    </style>
    <dialog>
      <slot></slot>  
    </dialog>
`;

export default template;
