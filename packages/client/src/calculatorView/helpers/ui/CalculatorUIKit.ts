import {ErrorList} from "./ErrorList";
import {ResultBox} from "./ResultBox";
import {InsertionMode, OperationButton} from "./OperationButton";
import {
    CalculatorUIKitInterface,
    CreateDefaultButtonArgs,
    CreateEqualsButtonArgs,
    CreateFunctionButtonArgs,
} from "../../types";
import {Symbols} from "@calculator/common";


export class CalculatorUIKit implements CalculatorUIKitInterface {
    result;
    errorsList;
    inputElement;
    private symbols: Symbols;
    constructor(symbols: Symbols) {
        this.errorsList = new ErrorList(document.getElementById("errors-list")!);
        this.result = new ResultBox(document.getElementById("calculation-result")!);
        this.inputElement = document.getElementById("calculation-input") as HTMLInputElement;

        this.symbols = symbols;
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
        return new OperationButton(this.symbols.CE, this.inputElement)
            .addOnClick(onCEButtonClick)
            .create();
    }

    createParenthesesButton(): HTMLButtonElement {
        const textContent = `${this.symbols.LP} ${this.symbols.RP}`
        return new OperationButton(textContent, this.inputElement)
            .addInsertionMode("parentheses", this.symbols)
            .create();
    }

    createEqualsButton({onClick}: CreateEqualsButtonArgs): HTMLButtonElement {
        return new OperationButton(this.symbols.EQUALS, this.inputElement)
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
            .addInsertionMode("text", this.symbols)
            .create()
    }

    createFunctionButton({sign, postfixForm}: CreateFunctionButtonArgs): HTMLButtonElement {
        const insertionMode: InsertionMode = postfixForm
            ? "textAfterParentheses"
            : "textBeforeParentheses";

        return new OperationButton(sign, this.inputElement)
            .addInsertionMode(insertionMode, this.symbols)
            .create()
    }
}