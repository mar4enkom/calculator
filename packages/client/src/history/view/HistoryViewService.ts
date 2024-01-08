import {HistoryButton} from "./ui/HistoryButton/HistoryButton";
import {HistoryEvents} from "../observer/types";
import {DomIds} from "../../shared/contstants/dom";
import {appendElement, removeElement} from "../../calculator/view/utils/appendElement";
import {RenderIds} from "../../shared/contstants/renderIds";
import {Dialog} from "./ui/Dialog/Dialog/Dialog";

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
        if(isShowing) {
            const root = document.getElementById(DomIds.CALCULATOR_TOP)!;

            const innerContent = document.createElement("div");
            innerContent.innerHTML = `<p>Dialog</p>`;

            const dialog = new Dialog()
                .onClose(() => this.historyEvents.onHideDialog.dispatch(undefined))
                .create({innerContent});

            appendElement(dialog, RenderIds.HISTORY_DIALOG, root);
        } else {
            removeElement(RenderIds.HISTORY_DIALOG)
        }
    }
}