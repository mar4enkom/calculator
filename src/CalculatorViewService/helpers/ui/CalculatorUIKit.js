import {InsertionModes, OperationButton} from "ViewService/helpers/ui/OperationButton.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {ErrorsList} from "ViewService/helpers/ui/ErrorsList.js";
import {ResultBox} from "ViewService/helpers/ui/ResultBox.js";

export class CalculatorUIKit {
    constructor() {
        this.errorsList = new ErrorsList(document.getElementById("errors-list"));
        this.result = new ResultBox(document.getElementById("calculation-result"));
        this.inputElement = document.getElementById("calculation-input");

        this.functionsColumn = document.getElementById("functions-buttons-wrapper");
        this.numbersColumn = document.getElementById("numbers-buttons-wrapper");
        this.operationsColumn = document.getElementById("operations-buttons-wrapper");
    }

    getExpression() {
        return this.inputElement.value;
    }

    createCEButton() {
        const onCEButtonClick = () => {
            const currentExpression = this.inputElement.value;
            const newExpression = currentExpression.substring(0, currentExpression.length - 1);
            this.inputElement.value = newExpression;
            this.inputElement.focus();
        }
        return new OperationButton(Symbols.CE, this.inputElement)
            .addOnClick(onCEButtonClick)
            .create();
    }

    createParenthesesButton() {
        const textContent = `${Symbols.LP} ${Symbols.RP}`
        return new OperationButton(textContent, this.inputElement)
            .addInsertionMode(InsertionModes.PARENTHESES)
            .create();
    }

    createEqualsButton({onClick}) {
        return new OperationButton(Symbols.EQUALS, this.inputElement)
            .addOnClick(() => {
                onClick();
                this.inputElement.focus();
            })
            .addClass("btn-outline-secondary")
            .addClass("equalButton")
            .create();
    }

    createDefaultButton({sign}) {
        return new OperationButton(sign, this.inputElement)
            .addInsertionMode(InsertionModes.TEXT)
            .create()
    }

    createFunctionButton({sign, postfixForm}) {
        const insertionMode = postfixForm
            ? InsertionModes.TEXT_AFTER_PARENTHESES
            : InsertionModes.TEXT_BEFORE_PARENTHESES;

        return new OperationButton(sign, this.inputElement)
            .addInsertionMode(insertionMode)
            .create()
    }
}