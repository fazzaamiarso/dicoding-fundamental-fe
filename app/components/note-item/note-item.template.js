const template = document.createElement("template");

template.id = "note-item-template";
template.innerHTML = `
<style>
    :host {
        display: block;
    }
    li {        
        width: 100%;
        height: 100%;
        background-color: white;
    }
</style>
<li class="note-item">
    <h2 class="note-title">INSERT SOMETHING</h2>
    <p class="note-body">INSERT SOMETHING</p>
</li>
`;

export default template;
