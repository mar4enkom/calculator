export function render(element: HTMLElement, renderId: string, rootElement?: HTMLElement): void {
    const elementWrapper = document.getElementById(renderId);

    if (elementWrapper) {
        const parentElement = elementWrapper.parentNode;

        if (parentElement) {
            parentElement.removeChild(elementWrapper);
        } else {
            throw new Error("No parent element for item")
        }
    }

    const nonNullishRootElement = rootElement ?? document.getElementById("root")!;

    element.setAttribute("id", renderId);
    nonNullishRootElement.appendChild(element);
}