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
          border-radius: 2px;
        }

        .form__label {
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
          border: none;
          padding: .75rem 1rem;
          cursor: pointer;
        }

        .form__cancel {
        }

        .form__confirm {
          color: white;
          background: #2563eb;
        }

        input, textarea {
            padding:.5rem;
            outline: none;
        }

        textarea {
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
        placeholder="please type the title"
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
        placeholder="please type the body"
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
    </form>
    
`;

export default template;
