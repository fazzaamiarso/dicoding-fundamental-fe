const template = document.createElement("template");

template.id = "note-list-template";
template.innerHTML = `
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
        }
        :host {
            display: block;
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            margin-inline: auto;
            width: 90%;

            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;

        }
    </style>
    <ul class="note-list">
    </ul>
`;

export default template;
