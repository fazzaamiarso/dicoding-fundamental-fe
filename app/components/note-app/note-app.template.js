const template = document.createElement("template");

template.id = "note-app-template";
template.innerHTML = `
    <div>
        <note-input></note-input>
        <note-list></note-list>
    </div>
`;

export default template;
