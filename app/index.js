import notes from "./data.js";

document.querySelector("main").innerHTML = `
    <pre>
        ${JSON.stringify(notes, null, 2)}
    </pre>
`;
