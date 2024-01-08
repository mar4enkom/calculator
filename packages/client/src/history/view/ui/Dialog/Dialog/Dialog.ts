import {AppElement, CreateElementArgs} from "../../../../../shared/ui/types";
import "./dialog.css";
import {Darkener} from "../Darkener/Darkener";
import {MaybeUndefined} from "@calculator/common";

interface DialogElement extends AppElement {
    onClose(onClose: () => void): DialogElement;
}

export class Dialog implements DialogElement {
    private _onClose: (() => void) | undefined;

    create({innerContent}: CreateElementArgs) {
        const dialog = document.createElement("div");
        dialog.classList.add("dialog-wrapper");
        const wrapperOuter = document.createElement("div");

        const darkener = new Darkener()
            .onClose(this._onClose)
            .create();

        if(innerContent) {
            dialog.appendChild(innerContent)
        }

        wrapperOuter.appendChild(darkener);
        wrapperOuter.appendChild(dialog);

        return wrapperOuter;
    }

    onClose(onClose: MaybeUndefined<() => void>): DialogElement {
        this._onClose = onClose;
        return this;
    }
}