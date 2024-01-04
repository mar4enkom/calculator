import {RenderIds} from "../../app/constants/renderIds";

export function appendElement(element: HTMLElement, renderId: RenderIds, rootElement: HTMLElement): void {
    element.setAttribute("id", renderId);
    rootElement.appendChild(element);
}

export function removeElement(renderId: RenderIds) {
    const elementWrapper = document.getElementById(renderId);

    if (elementWrapper) {
        const parentElement = elementWrapper.parentNode;

        if (parentElement) {
            parentElement.removeChild(elementWrapper);
        } else {
            throw new Error("No parent element for item")
        }
    }
}