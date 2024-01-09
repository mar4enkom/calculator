type CreateDivArgs = {
    className?: string;
    id?: string;
}

export function createDiv({className, id}: CreateDivArgs): HTMLDivElement {
    const div = document.createElement("div");
    if(className) div.classList.add(className);
    if(id) div.setAttribute("id", id);
    return div;
}