import {HistoryEvents} from "@/history/mvc/model/types";
import {CalculatorEvents, CalculatorVariables} from "@/calculator";
import {HistoryButton} from "@/history/vistoryViewCreator/ui/HistoryButton/HistoryButton";
import {DomIds} from "@/shared/contstants/dom";
import {render} from "@/shared/utils/viewUtils/appendElement";
import {RenderIds} from "@/shared/contstants/renderIds";
import {CalculationHistory, HistoryItem} from "@calculator/common";
import {HistoryDialogContent} from "@/history/vistoryViewCreator/ui/Dialog/HistoryDialogContent/HistoryDialogContent";
import {Dialog} from "@/history/vistoryViewCreator/ui/Dialog/Dialog/Dialog";
import {historyVariables} from "@/history/mvc/model/variables";
import {throttle} from "@/shared/utils/throttle";

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
            historyVariables.pageNumber.setValue(0);
            this.historyEvents.onGetHistory.dispatch(undefined);
            historyVariables.pageNumber.setValue(1);
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

    renderDialogWithDetails(newHistory: CalculationHistory | undefined): void {
        const root = document.getElementById(DomIds.CALCULATOR_DIALOG_CONTENT);
        if(!root) return;

        render(RenderIds.HISTORY_DIALOG_CONTENT, root, () => {
            const onHistoryItemClick = (payload: HistoryItem) => {
                this.calculatorEvents.onInputExpressionChange.dispatch({inputValue: payload.expression});
                this.calculatorVariables.value.setValue(payload.expressionResult);
                this.historyEvents.onHideDialog.dispatch(undefined);
            }

            const onLoadMoreClick = () => {
                this.historyEvents.onLoadMore.dispatch(undefined);
                const oldPageNumber = historyVariables.pageNumber.getValue()!;
                historyVariables.pageNumber.setValue(oldPageNumber + 1);
            }

            const onDialogContentScroll = throttle((scrollTop: number) => {
                historyVariables.dialogScrollTop.setValue(scrollTop);
            }, 50);

            const initialScrollValue = historyVariables.dialogScrollTop.getValue();

            return new HistoryDialogContent()
                .calculationHistory(newHistory!)
                .onItemClick(onHistoryItemClick)
                .onLoadMoreClick(onLoadMoreClick)
                .onScroll(onDialogContentScroll)
                .initialScroll(initialScrollValue)
                .create();
        })(newHistory != null);
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