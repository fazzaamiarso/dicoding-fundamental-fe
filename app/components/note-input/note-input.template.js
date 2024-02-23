const template = document.createElement("template");

template.id = "note-input-template";
template.innerHTML = `
    <style>
        :host {
            display: block;
        }

        form {
            padding: 1rem;
            box-sizing: border-box;
            margin-inline: auto;
            display: flex;
            flex-direction : column;
            gap: 1.5rem;
        }

        .form__title {
          margin: 0;  
        }

        .form__group {
            display: flex;
            flex-direction: column;
            gap:.5rem;
        }

        .form__textfield {
          border: 1px solid black;
          border-radius: 4px;

          padding: 1rem;
          font-size: 1rem;
        }
        
        .form__textfield:focus-visible {
          outline: 1px solid blue;
        }

        .form__textfield--error {
          border: 1px var(--error) solid;
        }

        .form__label {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .form__error {
          font-size: .8rem;
          color: red;
        }

        .form__actions {
          margin-left: auto;
          
          display: flex;
          gap: .5rem;
        }

        button {
          font-weight: 600;
          font-size: .9rem;

          border: none;
          border-radius: 4px;
          padding: 1rem 1.25rem;
          cursor: pointer;
        }

        .form__cancel {
          background: var(--stone-100);
          color: var(--stone-800);

        }

        .form__confirm {
          color: var(--stone-50);
          background: #2563eb;
        }

        input, textarea {
            padding:.5rem;
            outline: none;
        }

        input::placeholder, textarea::placeholder {
            font-family: var(--font-family);
          }
          
        textarea {
          font-family: var(--font-family);
          resize: vertical;
        }
    </style>
    <form novalidate class="form">
    <h2 class="form__title">Add A New Note</h2>
    <div class="form__group">
      <label for="title-input" class="form__label">Title</label>
      <input
        id="title-input"
        name="title-input"
        class="form__textfield"
        placeholder="e.g grocery list"
        autocomplete="off"
        required
      />
      <span id="title-error" class="form__error"></span>
    </div>
    <div class="form__group">
      <label for="body-input" class="form__label">Body</label>
      <textarea
        id="body-input"
        name="body-input"
        class="form__textfield"
        placeholder="e.g. banana, apple, orange"
        rows="5"
        required
      ></textarea>
      <span id="body-error" class="form__error"></span>
    </div>
    <div class="form__actions">
      <button
        type="button"
        class="form__cancel">
        Cancel
      </button>
      <button class="form__confirm">Add note</button>
    </div>
  </form>
    
`;

export default template;
