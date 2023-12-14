import {Maybe} from "@calculator/common";
import {CalculationErrors, ContentList} from "@calculator/common";

export class ErrorList implements ContentList {
    private root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
        this.render = this.render.bind(this);
    }

    render(errorsList: Maybe<CalculationErrors["errors"]>): void {
        this.clear();
        errorsList?.forEach(error => {
            const errorLi = document.createElement("li");
            errorLi.textContent = error.message;
            this.root.appendChild(errorLi);
        });
    }

    clear(): void {
        const errorsLi = this.root.querySelectorAll("li");
        errorsLi?.forEach(liElement => liElement.remove());
    }
}