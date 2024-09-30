import {MaybeUndefined} from "@calculator/common";
import {AppElement} from "@/shared/ui/types";
import historyIcon from "./history.png";
import "./historyButton.css";

interface ButtonElement extends AppElement {
    onClick: (a: MaybeUndefined<() => void>) => this;
}

export class HistoryButton implements ButtonElement {
    private _onClick: MaybeUndefined<() => void>;
    create(): HTMLButtonElement {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-light");
        button.classList.add("history-btn");
        button.innerHTML = `
            <img src="${historyIcon}" alt="History" />
        `;

        button.addEventListener("click", () => this._onClick?.())

        return button;
    }

    onClick(onClick: MaybeUndefined<() => void>): this {
        this._onClick = onClick;
        return this;
    }
}
