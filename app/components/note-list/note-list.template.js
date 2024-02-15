const template = document.createElement("template");

template.id = "note-list-template";
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;

        }
    </style>
    <ul class="note-list">
    </ul>
`;

export default template;