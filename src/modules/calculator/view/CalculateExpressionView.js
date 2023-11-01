import {ObservableType} from "../model/CalculateExpressionService.js";
import {Operations} from "../../../../userConfig/operations/constants.js";
import {InsertionModes, OperationButton} from "./OperationButton.js";
import {getOperationsRenderInfo} from "./utils/getOperationsRenderInfo.js";
import {Symbols} from "../../../constants/constants.js";

export class CalculateExpressionView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;

        this.inputElement = document.getElementById("calculation-input");
        this.errorsListElement = document.getElementById("errors-list");
        this.resultElement = document.getElementById("calculation-result");

        this.inputElement.focus();

        this.numbersRow = document.getElementById("numbers-buttons-wrapper");

        //Q: is it better to subscribe to the model in controller or in view?
        this.model.subscribe(ObservableType.CALCULATION_RESULT, this.#renderResult.bind(this));
        this.model.subscribe(ObservableType.VALIDATION_ERROR, this.#renderValidationErrors.bind(this));

        this.#bindEventListeners();
    }

    render() {
        this.#renderOperationButtons();
        this.#renderNumberButtons();
        this.#renderDotButton();
        this.#renderParenthesesButton();
        this.#renderCEButton();
        this.#renderEqualsButton();
    }

    #handleCalculateExpression() {
        const currentExpression = this.inputElement.value;
        this.controller.handleCalculateExpression(currentExpression);
        this.inputElement.focus();
    }

    #bindEventListeners() {
        this.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
                this.#handleCalculateExpression();
            }
        });
    }

    #renderValidationErrors(errorsList) {
        this.#deleteErrorListItems();
        errorsList?.forEach(errorString => {
            const errorLi = document.createElement("li");
            errorLi.textContent = errorString;
            this.errorsListElement.appendChild(errorLi);
        });
    }

    #renderResult(result) {
        this.#deleteErrorListItems();
        this.resultElement.textContent = `= ${result}`;
    }

    #renderOperationButtons() {
        Object.keys(this.model.config).forEach((operationCategory) => {
            const { renderRootId, insertionMode} = getOperationsRenderInfo(operationCategory);
            const renderRoot = document.getElementById(renderRootId);
            Object.values(this.model.config[operationCategory].operations).forEach((operationProps) => {
                const button = new OperationButton(operationProps.sign, this.inputElement)
                    .addInsertionMode(insertionMode)
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
            const button = new OperationButton(number, this.inputElement)
                .addInsertionMode(InsertionModes.TEXT)
                .create();
            this.numbersRow.appendChild(button);
        });
    }

    #renderDotButton() {
        const dotButton = new OperationButton(Symbols.DOT, this.inputElement)
            .addInsertionMode(InsertionModes.TEXT)
            .create();
        this.numbersRow.appendChild(dotButton);
    }

    #renderParenthesesButton() {
        const textContent = `${Symbols.LP} ${Symbols.RP}`
        const parenthesesButton = new OperationButton(textContent, this.inputElement)
            .addInsertionMode(InsertionModes.PARENTHESES)
            .create();
        this.numbersRow.appendChild(parenthesesButton);
    }

    #renderEqualsButton() {
        const equalsButton = new OperationButton(Symbols.EQUALS, this.inputElement)
            .addOnClick(this.#handleCalculateExpression.bind(this))
            .addClass("btn-outline-secondary")
            .create();
        this.numbersRow.appendChild(equalsButton);
    }

    #renderCEButton() {
        const onCEButtonClick = () => {
            const currentExpression = this.inputElement.value;
            const newExpression = currentExpression.substring(0, currentExpression.length - 1);
            this.inputElement.value = newExpression;
            this.inputElement.focus();
        }
        const clearEntryButton = new OperationButton("CE", this.inputElement)
            .addOnClick(onCEButtonClick)
            .create();
        this.numbersRow.appendChild(clearEntryButton);
    }

    #deleteErrorListItems() {
        const errorsLi = this.errorsListElement.querySelectorAll("li");
        errorsLi.forEach(liElement => liElement.remove());
    }
}