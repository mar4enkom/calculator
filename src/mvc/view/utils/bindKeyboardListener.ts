type KeyName = "Enter";
export function bindKeyboardListener({ keyName, onKeydown, root}: {
    keyName: KeyName;
    onKeydown: () => void;
    root: HTMLElement;
}): void {
    root.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === keyName) {
            event.preventDefault();
            onKeydown();
        }
    });
}
