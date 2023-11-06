import {getOperationsRenderInfo} from "../utils/getOperationsRenderInfo.js";
import {InsertionModes, OperationButton} from "./OperationButton.js";
import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";

export class CalculateExpressionRenderer {
    constructor(view) {
        this.numbersColumn = document.getElementById("numbers-buttons-wrapper");
        this.view = view;
    }

    render() {
        this.#renderOperationButtons();
        this.#renderNumberButtons();
        this.#renderDotButton();
        this.#renderParenthesesButton();
        this.#renderCEButton();
        this.#renderEqualsButton();
    }

    #renderOperationButtons() {
        Object.keys(this.view.config).forEach((operationCategory) => {
            const { renderRootId, insertionMode} = getOperationsRenderInfo(operationCategory);
            const renderRoot = document.getElementById(renderRootId);
            Object.values(this.view.config[operationCategory]).forEach((operationProps) => {
                const modifiedInsertionMode = operationProps?.postfixForm
                    ? InsertionModes.TEXT_AFTER_PARENTHESES
                    : insertionMode;
                const button = new OperationButton(operationProps.sign, this.view.inputElement)
                    .addInsertionMode(modifiedInsertionMode)
                    .create();
                renderRoot.appendChild(button);
            });
        });
    }

    #renderNumberButtons() {
        const numbersArray = [...Array(10).keys()]
            .reverse()
            .map(el => el.toString());

        numbersArray.forEach(number => {
            const button = new OperationButton(number, this.view.inputElement)
                .addInsertionMode(InsertionModes.TEXT)
                .create();
            this.numbersColumn.appendChild(button);
        });
    }

    #renderDotButton() {
        const dotButton = new OperationButton(Symbols.DOT, this.view.inputElement)
            .addInsertionMode(InsertionModes.TEXT)
            .create();
        this.numbersColumn.appendChild(dotButton);
    }

    #renderParenthesesButton() {
        const textContent = `${Symbols.LP} ${Symbols.RP}`
        const parenthesesButton = new OperationButton(textContent, this.view.inputElement)
            .addInsertionMode(InsertionModes.PARENTHESES)
            .create();
        this.numbersColumn.appendChild(parenthesesButton);
    }

    #renderEqualsButton() {
        const equalsButton = new OperationButton(Symbols.EQUALS, this.view.inputElement)
            .addOnClick(this.view.handleCalculateExpression.bind(this.view))
            .addClass("btn-outline-secondary")
            .create();
        this.numbersColumn.appendChild(equalsButton);
    }

    #renderCEButton() {
        const onCEButtonClick = () => {
            const currentExpression = this.view.inputElement.value;
            const newExpression = currentExpression.substring(0, currentExpression.length - 1);
            this.view.inputElement.value = newExpression;
            this.view.inputElement.focus();
        }
        const clearEntryButton = new OperationButton("CE", this.view.inputElement)
            .addOnClick(onCEButtonClick)
            .create();
        this.numbersColumn.appendChild(clearEntryButton);
    }

}