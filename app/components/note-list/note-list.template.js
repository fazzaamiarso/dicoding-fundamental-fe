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
        .note__list {
            --columns: 1;
            
            list-style: none;
            margin: 0;
            padding: 0;

            margin-inline: auto;
            width: 90%;

            display: grid;
            grid-template-columns: repeat(var(--columns), 1fr);
            gap: 1rem;

        }

        @media screen and (min-width: 640px) {
            .note__list {
                --columns: 2;
            }
        }

        @media screen and (min-width: 1024px) {
            .note__list {
                --columns: 3;
            }
        }
    </style>
    <ul class="note__list">
    </ul>
`;

export default template;
