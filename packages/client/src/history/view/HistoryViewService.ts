import {HistoryButton} from "./ui/HistoryButton/HistoryButton";
import {HistoryEvents} from "../observer/types";
import {DomIds} from "../../shared/contstants/dom";
import {appendElement, removeElement} from "../../calculator/view/utils/appendElement";
import {RenderIds} from "../../shared/contstants/renderIds";
import {Dialog} from "./ui/Dialog/Dialog/Dialog";
import {HistoryDialogContent} from "./ui/Dialog/HistoryDialogContent/HistoryDialogContent";
import {CalculatorEvents, CalculatorVariables} from "../../calculator";
import {CalculationHistory, CalculationHistoryItem} from "@calculator/common";

export class HistoryViewService {
    private historyEvents: HistoryEvents;
    private calculatorEvents: CalculatorEvents;
    private calculatorVariables: CalculatorVariables;
    constructor(historyEvents: HistoryEvents, calculatorEvents: CalculatorEvents, calculatorVariables: CalculatorVariables) {
        this.historyEvents = historyEvents;
        this.calculatorEvents = calculatorEvents;
        this.calculatorVariables = calculatorVariables;

        this.createHistoryUI = this.createHistoryUI.bind(this);
        this.renderDialogWithDetails = this.renderDialogWithDetails.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
    }

    createHistoryUI() {
        const wrapper = document.createElement("div");

        const onHistoryButtonClick = () => {
            this.historyEvents.onShowDialog.dispatch(undefined);
            // TODO: unmock userId
            this.historyEvents.onFetchHistory.dispatch({userId: "1"})
        }

        const historyButton = new HistoryButton()
            .onClick(onHistoryButtonClick)
            .create();

        wrapper.appendChild(historyButton);

        return wrapper;
    }

    renderDialogWithDetails(calculationHistory: CalculationHistory): void {
        removeElement(RenderIds.HISTORY_DIALOG);
        const onHistoryItemClick = (payload: CalculationHistoryItem) => {
            this.calculatorEvents.onInputExpressionChange.dispatch({inputValue: payload.expression});
            this.calculatorVariables.value.setValue(payload.expressionResult);
            this.historyEvents.onHideDialog.dispatch(undefined);
        }

        const dialogContent = new HistoryDialogContent()
            .calculationHistory(calculationHistory)
            .onItemClick((onHistoryItemClick))
            .create();

        this.renderDialog(true, dialogContent);
    }

    renderDialog(isShowing: boolean, innerContent: HTMLElement) {
        if(isShowing) {
            const root = document.getElementById(DomIds.CALCULATOR_TOP)!;

            const dialog = new Dialog()
                .onClose(() => this.historyEvents.onHideDialog.dispatch(undefined))
                .create({innerContent});

            appendElement(dialog, RenderIds.HISTORY_DIALOG, root);
        } else {
            removeElement(RenderIds.HISTORY_DIALOG)
        }
    }
}