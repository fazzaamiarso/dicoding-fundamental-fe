const template = document.createElement("template");

template.id = "note-app-template";
template.innerHTML = `
    <style>
        .app {
            position: relative;
            margin-block: 2rem;
        }

        .app__button--add {
            outline: none;
            border: 0;
            border-radius: 99999px;
            
            position: fixed;
            right: 0;
            bottom: 0;

            background:white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .app__button--add:focus {
            outline: 1px blue solid;
        }

        .app__button--add > svg {
            pointer-events:none;
            width: 4rem;
            background: white;
            border-radius: 10000px;
        }
    </style>
    <div class="app"> 
        <note-list></note-list>
        <note-dialog>
            <note-input></note-input>
        </note-dialog>
        <div>
            <button class="app__button--add">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
`;

export default template;
