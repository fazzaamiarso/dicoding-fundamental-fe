const template = document.createElement("template");

template.id = "note-item-template";
template.innerHTML = `
<style>
    *, *::before, *::after {
        box-sizing: border-box;
    }
    :host {
        display: block;
    }
    .note {        
        width: 100%;
        height: 100%;
        background-color: white;
        padding: 1rem;
    }

    .note__top {
        display: flex;
        align-items: start;
        gap: 1rem;
    }

    .note__dates {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        background-color: var(--stone-100);
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 8px;
    }

    .note__shortday {
        color: var(--stone-500);
        font-size: .8rem;
    }

    .note__date {
        font-size: 1.25rem;
        font-weight: 600;
    }

    .note__time {
        font-size: .9rem;
        color: var(--stone-400);
    }

    .note__title {
        margin:0;
    }

    .note__actions {
        opacity: 0;
        display: flex;
        justify-items: justify-start;
        gap: 1.5rem;

        transition: opacity 350ms;
    }

    .note:hover > .note__actions {
        opacity : 1;
    }

    .note__actions button {
        border: none;
        background: transparent;
        width: max-content;
        cursor: pointer;
    }

    .note__delete > svg {
        width: 1.5rem;
        color: var(--stone-500)
    }
    .note__archive > svg {
        width: 1.5rem;
        color: var(--stone-500)
    }

  

</style>
<li class="note">
    <div class="note__top">
        <div class="note__dates">
            <div class="note__shortday"></div>    
            <div class="note__date"></div>    
        </div>
        <div class="">
            <h2 class="note__title">INSERT SOMETHING</h2>
            <span class="note__time"></span>
        </div>
    </div>
    <p class="note__body">INSERT SOMETHING</p>
    <div class="note__actions">
        <button class="note__delete">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
        <button class="note__archive">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        </button>
  </svg>
  
    </div>
</li>
`;

export default template;
