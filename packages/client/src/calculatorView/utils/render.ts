export function render(element: HTMLElement, renderId: string): void {
    const elementWrapper = document.getElementById(renderId);

    if (elementWrapper) {
        const parentElement = elementWrapper.parentNode;

        if (parentElement) {
            parentElement.removeChild(elementWrapper);
        } else {
            throw new Error("No parent element for item")
        }
    }

    element.setAttribute("id", renderId);
    document.getElementById("root")!.appendChild(element);
}