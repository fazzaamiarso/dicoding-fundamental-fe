const template = document.createElement("template");

template.id = "note-input-template";
template.innerHTML = `
    <style>
        :host {
            display: block;
        }

        form {
            width: 90%;
            margin-inline: auto;

            display: flex;
            flex-direction : column;
            gap: 1.5rem;
        }

        .input-container {
            display: flex;
            flex-direction: column;
        }

        input, textarea {
            padding:.5rem;
        }

        button {
            padding: .5rem;
        }
    </style>
    <form>
        <div class="input-container">
            <label for="title-input">Title</label>
            <input id="title-input" name="title-input" placeholder="please type the title" required  />
        </div>
        <div class="input-container">
            <label for="body-input">Body</label>
            <textarea id="body-input" name="body-input" placeholder="please type the body" resize="vertical" required></textarea>
        </div>
        <button>Add note</button>
    </form>
`;

export default template;
