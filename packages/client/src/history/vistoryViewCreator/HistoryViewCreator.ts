import {HistoryEvents} from "@/history/mvc/model/types";
import {CalculatorEvents, CalculatorVariables} from "@/calculator";
import {HistoryButton} from "@/history/vistoryViewCreator/ui/HistoryButton/HistoryButton";
import {DomIds} from "@/shared/contstants/dom";
import {render} from "@/shared/utils/viewUtils/appendElement";
import {RenderIds} from "@/shared/contstants/renderIds";
import {CalculationHistory, HistoryItem} from "@calculator/common";
import {HistoryDialogContent} from "@/history/vistoryViewCreator/ui/Dialog/HistoryDialogContent/HistoryDialogContent";
import {Dialog} from "@/history/vistoryViewCreator/ui/Dialog/Dialog/Dialog";

export class HistoryViewCreator {
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
            this.historyEvents.onGetHistory.dispatch({userId: "1"})
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

        render(RenderIds.HISTORY_DIALOG_LOADING, root, () => {
            const dialogContent = document.createElement("div");
            dialogContent.innerHTML = `<p>Loading...</p>`;
            return dialogContent;
        })(isLoading)
    }

    renderDialogWithDetails(calculationHistory: CalculationHistory | undefined): void {
        const root = document.getElementById(DomIds.CALCULATOR_DIALOG_CONTENT);
        if(!root) return;

        render(RenderIds.HISTORY_DIALOG_CONTENT, root, () => {
            const onHistoryItemClick = (payload: HistoryItem) => {
                this.calculatorEvents.onInputExpressionChange.dispatch({inputValue: payload.expression});
                this.historyEvents.onAddHistoryRecord.dispatch(payload);
                this.calculatorVariables.value.setValue(payload.expressionResult);
                this.historyEvents.onHideDialog.dispatch(undefined);
            }

            return new HistoryDialogContent()
                .calculationHistory(calculationHistory!)
                .onItemClick(onHistoryItemClick)
                .create();
        })(calculationHistory != null);
    }

    renderDialog(isShowing: boolean, innerContent: HTMLElement) {
        const root = document.getElementById(DomIds.CALCULATOR_TOP_BOX)!;

        render(RenderIds.HISTORY_DIALOG, root, () => {
            return new Dialog()
                .onClose(() => this.historyEvents.onHideDialog.dispatch(undefined))
                .id(DomIds.CALCULATOR_DIALOG_CONTENT)
                .create({innerContent});
        })(isShowing);
    }
}