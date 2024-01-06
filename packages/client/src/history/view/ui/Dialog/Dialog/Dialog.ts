import {AppElement, CreateElementArgs} from "../../../../../shared/ui/types";
import "./dialog.css";

export class Dialog implements AppElement {
    create({innerContent}: CreateElementArgs) {
        const dialog = document.createElement("div");
        dialog.classList.add("dialog-wrapper");

        if(innerContent) {
            dialog.appendChild(innerContent)
        }
        return dialog;
    }
}