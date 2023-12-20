import {Maybe} from "@calculator/common";
import {ContentBox} from "viewService/types";

export class ResultBox implements ContentBox {
    private root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;

        this.render = this.render.bind(this);
    }

    render(result: Maybe<string>): void {
        if(result == null) {
            this.root.textContent = ``;
        } else {
            this.root.textContent = `= ${result}`;
        }
    }

    clear(): void {
        this.root.textContent = "";
    }
}