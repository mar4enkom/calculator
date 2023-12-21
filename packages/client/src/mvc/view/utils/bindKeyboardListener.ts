type KeyName = "Enter";

type BindKeyboardListenerArgs = {
    keyName: KeyName;
    onKeydown(): void;
    root: HTMLElement;
};

export function bindKeyboardListener({ keyName, onKeydown, root}: BindKeyboardListenerArgs): void {
    root.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === keyName) {
            event.preventDefault();
            onKeydown();
        }
    });
}
