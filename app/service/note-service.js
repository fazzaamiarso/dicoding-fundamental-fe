const BASE_URL = "https://notes-api.dicoding.dev/v2/";

export function getActiveNotes() {
  return fetch(new URL("notes", BASE_URL));
}

export function getArchivedNotes() {
  return fetch(new URL("notes/archived", BASE_URL));
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

export function archiveNote({ id }) {
  return fetch(new URL(`notes/${id}/archive`, BASE_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function unArchiveNote({ id }) {
  return fetch(new URL(`notes/${id}/unarchive`, BASE_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
