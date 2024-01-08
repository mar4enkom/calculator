import {AppElement} from "../../../../../shared/ui/types";
import "./darkener.css";
import {MaybeUndefined} from "@calculator/common";

interface DarkenerElement extends AppElement {
    onClose(onClose: MaybeUndefined<() => void>): DarkenerElement;
}

export class Darkener implements DarkenerElement{
    private _onClose: MaybeUndefined<() => void>;

    create() {
        const darkener = document.createElement("div");
        darkener.classList.add("darkener-wrapper");

        darkener.addEventListener("click", () => this._onClose?.());

        return darkener;
    }

    onClose(onClose: MaybeUndefined<() => void>): DarkenerElement {
        this._onClose = onClose;
        return this;
    }
}