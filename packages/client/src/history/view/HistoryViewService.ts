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
        this.renderLoadingDialog = this.renderLoadingDialog.bind(this);
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

    renderLoadingDialog(isLoading: boolean): void {
        const root = document.getElementById(DomIds.CALCULATOR_DIALOG_CONTENT);
        if(!root) return;

        if(isLoading) {
            const dialogContent = document.createElement("div");
            dialogContent.innerHTML = `<p>Loading...</p>`;
            appendElement(dialogContent, RenderIds.HISTORY_DIALOG_LOADING, root);
        } else {
            removeElement(RenderIds.HISTORY_DIALOG_LOADING)
        }
    }

    renderDialogWithDetails(calculationHistory: CalculationHistory | undefined): void {
        const root = document.getElementById(DomIds.CALCULATOR_DIALOG_CONTENT);
        if(!root) return;

        if(calculationHistory) {
            const onHistoryItemClick = (payload: CalculationHistoryItem) => {
                this.calculatorEvents.onInputExpressionChange.dispatch({inputValue: payload.expression});
                this.calculatorVariables.value.setValue(payload.expressionResult);
                this.historyEvents.onHideDialog.dispatch(undefined);
            }

            const dialogContent = new HistoryDialogContent()
                .calculationHistory(calculationHistory)
                .onItemClick((onHistoryItemClick))
                .create();
            appendElement(dialogContent, RenderIds.HISTORY_DIALOG_CONTENT, root);
        } else {
            removeElement(RenderIds.HISTORY_DIALOG_CONTENT)
        }
    }

    renderDialog(isShowing: boolean, innerContent: HTMLElement) {
        if(isShowing) {
            const root = document.getElementById(DomIds.CALCULATOR_TOP_BOX)!;

            const dialog = new Dialog()
                .onClose(() => this.historyEvents.onHideDialog.dispatch(undefined))
                .id(DomIds.CALCULATOR_DIALOG_CONTENT)
                .create({innerContent});

            appendElement(dialog, RenderIds.HISTORY_DIALOG, root);
        } else {
            removeElement(RenderIds.HISTORY_DIALOG)
        }
    }
}