import {Maybe} from "shared/types/typesUtils";
import {CalculationErrors} from "shared/types/calculationResult";

interface ContentList {
    render: (errorList: Maybe<CalculationErrors["errors"]>) => void;
    clear: () => void;
}

export class ErrorList implements ContentList {
    private root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
        this.render = this.render.bind(this);
    }

    render(errorsList: Maybe<CalculationErrors["errors"]>) {
        this.clear();
        errorsList?.forEach(error => {
            const errorLi = document.createElement("li");
            errorLi.textContent = error.message;
            this.root.appendChild(errorLi);
        });
    }

    clear() {
        const errorsLi = this.root.querySelectorAll("li");
        errorsLi?.forEach(liElement => liElement.remove());
    }
}