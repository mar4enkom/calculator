import {HistoryButton} from "@/history/historyViewCreator/ui/HistoryButton/HistoryButton";
import {DomIds} from "@/shared/contstants/dom";
import {render} from "@/shared/utils/viewUtils/appendElement";
import {RenderIds} from "@/shared/contstants/renderIds";
import {CalculationHistory, HistoryItem} from "@calculator/common";
import {HistoryDialogContent} from "@/history/historyViewCreator/ui/Dialog/HistoryDialogContent/HistoryDialogContent";
import {Dialog} from "@/history/historyViewCreator/ui/Dialog/Dialog/Dialog";
import {historyVariables} from "@/history/mvc/model/variables";
import {throttle} from "@/shared/utils/throttle";
import {historyEvents} from "@/history/mvc/model/events";
import {calculatorEvents, calculatorVariables} from "@/calculator";

export class HistoryViewCreator {
    constructor() {
        this.createHistoryUI = this.createHistoryUI.bind(this);
        this.renderDialogWithDetails = this.renderDialogWithDetails.bind(this);
        this.renderLoadingDialog = this.renderLoadingDialog.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
    }

    createHistoryUI() {
        const wrapper = document.createElement("div");

        const onHistoryButtonClick = () => {
            historyEvents.onShowDialog.dispatch(undefined);
            historyEvents.onGetHistory.dispatch(undefined);
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
                calculatorEvents.onInputExpressionChange.dispatch({inputValue: payload.expression});
                calculatorVariables.value.setValue(payload.expressionResult);
                historyEvents.onHideDialog.dispatch(undefined);
                historyEvents.onAddRecord.dispatch({
                    expression: payload.expression,
                    expressionResult: payload.expressionResult
                })
            }

            const onLoadMoreClick = () => {
                historyEvents.onLoadMore.dispatch(undefined);
            }

            const onDialogContentScroll = throttle((scrollTop: number) => {
                historyVariables.dialogScrollTop.setValue(scrollTop);
            }, 20);

            const initialScrollValue = historyVariables.dialogScrollTop.getValue();
            const disableLoadMore = !historyVariables.hasMore.getValue();

            return new HistoryDialogContent()
                .setItems(newHistory!)
                .onItemClick(onHistoryItemClick)
                .disableLoadMore(disableLoadMore)
                .onLoadMoreClick(onLoadMoreClick)
                .onScroll(onDialogContentScroll)
                .setInitialScrollTop(initialScrollValue)
                .create();
        })(newHistory != null);
    }

    renderDialog(isShowing: boolean, innerContent: HTMLElement) {
        const root = document.getElementById(DomIds.CALCULATOR_TOP_BOX)!;

        render(RenderIds.HISTORY_DIALOG, root, () => {
            return new Dialog()
                .onClose(() => historyEvents.onHideDialog.dispatch(undefined))
                .id(DomIds.CALCULATOR_DIALOG_CONTENT)
                .create({innerContent});
        })(isShowing);
    }
}