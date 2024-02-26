const template = document.createElement("template");

template.id = "tabs-list-template";
template.innerHTML = `
    <style>
        .tabs {
            padding: 0;
            list-style: none;
            display: flex;
            gap: 2rem;
        }

        .tabs__trigger {
            border: none;
            border-radius: 4px;
            
            background: var(--stone-200);
            color: var(--stone-700);
            
            font-weight: 600;
            padding: .75rem;
        }

        .tabs__trigger--active {
            color: red;
        }
    </style>
    <ul class="tabs">
        <li class="tabs__item"><button class="tabs__trigger" data-tab-id="all">All</button></li>
        <li class="tabs__item"><button class="tabs__trigger" data-tab-id="active">Active</button></li>
        <li class="tabs__item"><button class="tabs__trigger" data-tab-id="archived">Archived</button></li>
    </ul>
`;
export default template;
