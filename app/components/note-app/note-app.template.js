const template = document.createElement("template");

template.id = "note-app-template";
template.innerHTML = `
    <div>
        <note-list></note-list>
    </div>
`;

export default template;
