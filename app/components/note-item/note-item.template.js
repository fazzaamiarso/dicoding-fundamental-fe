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

    .note__date {
        display: flex;
        align-items: center;
        background-color: lightgray;
        padding: .5rem;
    }

    .note__title {
        margin:0;
    }
</style>
<li class="note">
    <div class="note__top">
        <div class="note__date"></div>
        <div class="">
            <h2 class="note__title">INSERT SOMETHING</h2>
            <span class="note__time"></span>
        </div>
    </div>
    <p class="note__body">INSERT SOMETHING</p>
</li>
`;

export default template;
