const BASE_URL = "https://notes-api.dicoding.dev/v2/";

export function getNotes() {
  return fetch(new URL("notes", BASE_URL));
}

export function createNote({ title, body }) {
  return fetch(new URL("notes", BASE_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
}

export function deleteNote({ id }) {
  return fetch(new URL(`notes/${id}`, BASE_URL), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
