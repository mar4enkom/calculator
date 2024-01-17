import {MaybeUndefined} from "@calculator/common";
import {AppElement, CreateElementArgs} from "@/shared/ui/types";
import {Darkener} from "@/history/historyViewCreator/ui/Dialog/Darkener/Darkener";
import "./dialog.css";

interface DialogElement extends AppElement {
    onClose(onClose: () => void): DialogElement;
}

export class Dialog implements DialogElement {
    private _onClose: MaybeUndefined<() => void>;
    private _id: string | undefined;

    create({innerContent}: CreateElementArgs) {
        const wrapperOuter = document.createElement("div");

        const dialog = document.createElement("div");
        dialog.classList.add("dialog-wrapper");

        if(this._id) {
            dialog.setAttribute("id", this._id);
        }

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

    onClose(onClose: MaybeUndefined<() => void>): this {
        this._onClose = onClose;
        return this;
    }

    id(id: string): this {
        this._id = id;
        return this;
    }
}