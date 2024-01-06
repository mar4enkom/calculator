import {HistoryButton} from "./ui/HistoryButton/HistoryButton";
import {HistoryEvents} from "../observer/types";
import {CollapsableDialog} from "./ui/Dialog/CollapsableDialog/CollapsableDialog";
import {DomIds} from "../../shared/contstants/dom";
import {appendElement, removeElement} from "../../calculator/view/utils/appendElement";
import {RenderIds} from "../../shared/contstants/renderIds";

export class HistoryViewService {
    private historyEvents: HistoryEvents;
    constructor(historyEvents: HistoryEvents) {
        this.historyEvents = historyEvents;

        this.createHistoryUI = this.createHistoryUI.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
    }

    createHistoryUI() {
        const wrapper = document.createElement("div");

        const historyButton = (new HistoryButton()).create();
        historyButton.addEventListener("click", () => {
            this.historyEvents.onShowDialog.dispatch(undefined);
        })

        wrapper.appendChild(historyButton);

        return wrapper;
    }

    renderDialog(isShowing: boolean) {
        console.log(isShowing)

        if(isShowing) {
            const root = document.getElementById(DomIds.CALCULATOR_TOP)!;
            const dialog = new CollapsableDialog(true);
            const innerContent = document.createElement("div");
            innerContent.innerHTML = `<p>Dialog</p>`;

            appendElement(dialog.create({innerContent}), RenderIds.HISTORY_DIALOG, root);
        } else {
            removeElement(RenderIds.HISTORY_DIALOG)
        }
    }
}