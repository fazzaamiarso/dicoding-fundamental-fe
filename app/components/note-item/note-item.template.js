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
</li>
`;

export default template;
