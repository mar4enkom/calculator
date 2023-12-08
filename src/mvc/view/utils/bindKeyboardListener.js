export function bindKeyboardListener({keyName, onKeydown, root}) {
    root.addEventListener("keydown", (event) => {
        if (event.key === keyName) {
            event.preventDefault();

            onKeydown();
        }
    });
}