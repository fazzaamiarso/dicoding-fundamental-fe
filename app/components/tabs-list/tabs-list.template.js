const template = document.createElement("template");

template.id = "tabs-list-template";
template.innerHTML = `
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
        }

        :host {
            display: block;
        }

        .tabs {
            padding: 0;
            list-style: none;

            display: flex;
            gap: 1rem;

            margin-inline: auto;
            width: 90%;
        }

        .tabs__trigger {
            border: none;
            border-radius: 4px;
            
            background: var(--stone-100);
            color: var(--stone-500);
            
            font-weight: 600;
            padding: .75rem;

            cursor: pointer;
        }

        .tabs__trigger--active {
            background: var(--stone-700);
            color: var(--stone-100);
        }
    </style>
    <ul class="tabs">
        <li class="tabs__item"><button class="tabs__trigger" data-tab-id="all">All</button></li>
        <li class="tabs__item"><button class="tabs__trigger" data-tab-id="active">Active</button></li>
        <li class="tabs__item"><button class="tabs__trigger" data-tab-id="archived">Archived</button></li>
    </ul>
`;
export default template;
