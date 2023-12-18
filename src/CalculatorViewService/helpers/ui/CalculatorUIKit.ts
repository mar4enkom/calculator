import {ErrorList} from "viewService/helpers/ui/ErrorList";
import {Symbols} from "userConfig/constants/constants";
import {ResultBox} from "viewService/helpers/ui/ResultBox";
import {InsertionMode, OperationButton} from "viewService/helpers/ui/OperationButton";
import {
    CalculatorUIKitInterface,
    CreateDefaultButtonArgs,
    CreateEqualsButtonArgs,
    CreateFunctionButtonArgs
} from "shared/types/types";

export class CalculatorUIKit implements CalculatorUIKitInterface {
    result;
    errorsList;
    inputElement;
    functionsColumn;
    numbersColumn;
    operationsColumn;
    constructor() {
        this.errorsList = new ErrorList(document.getElementById("errors-list")!);
        this.result = new ResultBox(document.getElementById("calculation-result")!);
        this.inputElement = document.getElementById("calculation-input") as HTMLInputElement;

        this.functionsColumn = document.getElementById("functions-buttons-wrapper") as HTMLDivElement;
        this.numbersColumn = document.getElementById("numbers-buttons-wrapper") as HTMLDivElement;
        this.operationsColumn = document.getElementById("operations-buttons-wrapper") as HTMLDivElement;
    }

    getExpression(): string {
        return this.inputElement.value;
    }

    createCEButton(): HTMLButtonElement {
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

    createParenthesesButton(): HTMLButtonElement {
        const textContent = `${Symbols.LP} ${Symbols.RP}`
        return new OperationButton(textContent, this.inputElement)
            .addInsertionMode("parentheses")
            .create();
    }

    createEqualsButton({onClick}: CreateEqualsButtonArgs): HTMLButtonElement {
        return new OperationButton(Symbols.EQUALS, this.inputElement)
            .addOnClick(() => {
                onClick();
                this.inputElement.focus();
            })
            .addClass("btn-outline-secondary")
            .addClass("equalButton")
            .create();
    }

    createDefaultButton({sign}: CreateDefaultButtonArgs): HTMLButtonElement {
        return new OperationButton(sign, this.inputElement)
            .addInsertionMode("text")
            .create()
    }

    createFunctionButton({sign, postfixForm}: CreateFunctionButtonArgs): HTMLButtonElement {
        const insertionMode: InsertionMode = postfixForm
            ? "textAfterParentheses"
            : "textBeforeParentheses";

        return new OperationButton(sign, this.inputElement)
            .addInsertionMode(insertionMode)
            .create()
    }
}