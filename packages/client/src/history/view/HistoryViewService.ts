import {HistoryButton} from "./ui/HistoryButton/HistoryButton";
import {HistoryEvents} from "../observer/types";
import {DomIds} from "../../shared/contstants/dom";
import {appendElement, removeElement} from "../../calculator/view/utils/appendElement";
import {RenderIds} from "../../shared/contstants/renderIds";
import {Dialog} from "./ui/Dialog/Dialog/Dialog";
import {HistoryDialogContent} from "./ui/Dialog/HistoryDialogContent/HistoryDialogContent";
import {CalculatorEvents, CalculatorVariables} from "../../calculator";
import {CalculationHistoryItem} from "@calculator/common";

export class HistoryViewService {
    private historyEvents: HistoryEvents;
    private calculatorEvents: CalculatorEvents;
    private calculatorVariables: CalculatorVariables;
    constructor(historyEvents: HistoryEvents, calculatorEvents: CalculatorEvents, calculatorVariables: CalculatorVariables) {
        this.historyEvents = historyEvents;
        this.calculatorEvents = calculatorEvents;
        this.calculatorVariables = calculatorVariables;

        this.createHistoryUI = this.createHistoryUI.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
    }

    createHistoryUI() {
        const wrapper = document.createElement("div");

        const historyButton = new HistoryButton()
            .onClick(() => this.historyEvents.onShowDialog.dispatch(undefined))
            .create();

        wrapper.appendChild(historyButton);

        return wrapper;
    }

    renderDialog(isShowing: boolean) {
        if(isShowing) {
            const root = document.getElementById(DomIds.CALCULATOR_TOP)!;

            const mockedHistory = [
                {id: "1", expressionResult: "4", expression: "2+2"},
                {id: "2", expressionResult: "3", expression: "2+12342342342342342342343"},
            ];

            const onHistoryItemClick = (payload: CalculationHistoryItem) => {
                this.calculatorEvents.onInputExpressionChange.dispatch({inputValue: payload.expression});
                this.calculatorVariables.value.setValue(payload.expressionResult);
                this.historyEvents.onHideDialog.dispatch(undefined);
            }

            const innerContent = new HistoryDialogContent()
                .calculationHistory(mockedHistory)
                .onItemClick((onHistoryItemClick))
                .create();

            const dialog = new Dialog()
                .onClose(() => this.historyEvents.onHideDialog.dispatch(undefined))
                .create({innerContent});

            appendElement(dialog, RenderIds.HISTORY_DIALOG, root);
        } else {
            removeElement(RenderIds.HISTORY_DIALOG)
        }
    }
}