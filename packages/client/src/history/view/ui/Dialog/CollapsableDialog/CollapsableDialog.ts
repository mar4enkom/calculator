import {AppElement, CreateElementArgs} from "../../../../../shared/ui/types";
import {Dialog} from "../Dialog/Dialog";
import {ClassNames} from "../../../../../shared/contstants/dom";

import "./collapsableDialog.css";

export class CollapsableDialog implements AppElement{
    private isShowing: boolean;

    constructor(isShowing: boolean) {
        this.isShowing = isShowing;
    }

    create({innerContent}: CreateElementArgs){
        const dialogCreator = new Dialog();
        const dialog = dialogCreator.create({innerContent});

        if(this.isShowing) {
            dialog.classList.add(ClassNames.SHOWING_DRAWER);
        } else {
            dialog.classList.add(ClassNames.HIDDEN_DRAWER);
        }

        return dialog;
    }
}