import {InsertionModes, OperationButton} from "./OperationButton.js";
import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {getNumberColumnItems} from "../utils/getNumberColumnItems.js";
import {Operations} from "../../../../../userConfig/operations/constants/operations.js";

export class CalculatorUIBuilder {
    constructor(ui, events, config) {
        this.ui = ui;
        this.events = events;
        this.config = config;

        this.ui.inputElement.focus();
    }

    render() {
        this.#renderSigns(this.config[Operations.SIGN], this.ui.functionsColumn);
        this.#renderConstants(this.config[Operations.CONSTANT], this.ui.functionsColumn);
        this.#renderFunctions(this.config[Operations.FUNCTION], this.ui.functionsColumn);
        this.#renderOperators(this.config[Operations.OPERATOR], this.ui.operationsColumn);
        this.#renderNumbers(getNumberColumnItems(), this.ui.numbersColumn);

        this.#renderHelperButtons([
            this.#createDotButton(),
            this.#createParenthesesButton(),
            this.#createCEButton(),
            this.#createEqualsButton(),
        ], this.ui.numbersColumn);
    }

    renderErrors(errorsList) {
        this.#clearErrors();
        errorsList?.forEach(errorString => {
            const errorLi = document.createElement("li");
            errorLi.textContent = errorString.message;
            this.ui.errorsListElement.appendChild(errorLi);
        });
    }

    renderResult(result) {
        this.#clearErrors();
        this.ui.resultElement.textContent = `= ${result}`;
    }

    #renderSigns(signsList, root) {
        signsList.forEach(signProps => {
            const button = new OperationButton(signProps.sign, this.ui.inputElement)
                .addInsertionMode(InsertionModes.TEXT)
                .create();
            root.appendChild(button);
        });
    }

    #renderConstants(constantsList, root) {
        constantsList.forEach(constantProps => {
            const button = new OperationButton(constantProps.sign, this.ui.inputElement)
                .addInsertionMode(InsertionModes.TEXT)
                .create();
            root.appendChild(button);
        });
    }

    #renderFunctions(functionsList, root) {
        functionsList.forEach(functionProps => {
            const insertionMode = functionProps?.postfixForm
                ? InsertionModes.TEXT_AFTER_PARENTHESES
                : InsertionModes.TEXT_BEFORE_PARENTHESES;
            const button = new OperationButton(functionProps.sign, this.ui.inputElement)
                .addInsertionMode(insertionMode)
                .create();
            root.appendChild(button);
        });
    }

    #renderOperators(operationsList, root) {
        operationsList.forEach(operationProps => {
            const button = new OperationButton(operationProps.sign, this.ui.inputElement)
                .addInsertionMode(InsertionModes.TEXT)
                .create();
            root.appendChild(button);
        });
    }

    #renderNumbers(numbersList, root) {
        numbersList.forEach(number => {
            const button = new OperationButton(number, this.ui.inputElement)
                .addInsertionMode(InsertionModes.TEXT)
                .create();
            root.appendChild(button);
        });
    }

    #renderHelperButtons(buttonsList, root) {
        buttonsList.forEach(button => {
            root.appendChild(button);
        });
    }

    #clearErrors() {
        const errorsLi = this.ui.errorsListElement.querySelectorAll("li");
        errorsLi.forEach(liElement => liElement.remove());
    }

    #createDotButton() {
        return new OperationButton(Symbols.DOT, this.ui.inputElement)
            .addInsertionMode(InsertionModes.TEXT)
            .create();
    }

    #createParenthesesButton() {
        const textContent = `${Symbols.LP} ${Symbols.RP}`
        return new OperationButton(textContent, this.ui.inputElement)
            .addInsertionMode(InsertionModes.PARENTHESES)
            .create();
    }

    #createEqualsButton() {
        return new OperationButton(Symbols.EQUALS, this.ui.inputElement)
            .addOnClick(() => {
                const currentExpression = this.ui.getExpression();
                this.events.handleCalculateExpression(currentExpression);
            })
            .addClass("btn-outline-secondary")
            .create();
    }

    #createCEButton() {
        const onCEButtonClick = () => {
            const currentExpression = this.ui.inputElement.value;
            const newExpression = currentExpression.substring(0, currentExpression.length - 1);
            this.ui.inputElement.value = newExpression;
            this.ui.inputElement.focus();
        }
        return new OperationButton(Symbols.CE, this.ui.inputElement)
            .addOnClick(onCEButtonClick)
            .create();
    }
}