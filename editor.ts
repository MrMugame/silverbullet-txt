export async function editor(): Promise<{ html: string, script: string }> {
    return {
        html: `
            <h1>Texteditor</h1>
            <textarea id="editor" rows="10" cols="80"></textarea>
        `,
        script: `
            globalThis.silverbullet.addEventListener("file-open", (event) => {
                document.getElementById("editor").value = new TextDecoder().decode(event.detail.data);
            });

            globalThis.silverbullet.addEventListener("file-update", (event) => {
                document.getElementById("editor").value = new TextDecoder().decode(event.detail.data);
            });

            globalThis.silverbullet.addEventListener("request-save", () => {
                globalThis.silverbullet.sendMessage("file-saved", { data: new TextEncoder().encode(document.getElementById("editor").value) });
            });

            globalThis.silverbullet.addEventListener("focus", () => {
                document.getElementById("editor").focus();
            });

            document.getElementById("editor").addEventListener("input", () => {
                globalThis.silverbullet.sendMessage("file-changed", {});
            });
        `
    }
}