import {Maybe} from "shared/types/typesUtils";

interface ContentBox {
    render: (result: Maybe<string>) => void;
    clear: () => void;
}

export class ResultBox implements ContentBox{
    private root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;

        this.render = this.render.bind(this);
    }

    render(result: Maybe<string>) {
        if(result == null) {
            this.root.textContent = ``;
        } else {
            this.root.textContent = `= ${result}`;
        }
    }

    clear() {
        this.root.textContent = "";
    }
}