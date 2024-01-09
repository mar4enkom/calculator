import {
    CalculatorUIKitInterface,
    CreateDefaultButtonArgs,
    CreateEqualsButtonArgs, CreateFunctionButtonArgs
} from "@/calculator/calculatorViewCreator/types";
import {Symbols} from "@calculator/common";
import {ErrorList} from "@/calculator/calculatorViewCreator/uiKit/components/ErrorList";
import {ClassNames, DomIds} from "@/shared/contstants/dom";
import {ResultBox} from "@/calculator/calculatorViewCreator/uiKit/components/ResultBox";
import {InsertionMode, OperationButton} from "@/calculator/calculatorViewCreator/uiKit/components/OperationButton";


export class CalculatorUIKit implements CalculatorUIKitInterface {
    result;
    errorsList;
    inputElement;
    private symbols: Symbols;
    constructor(symbols: Symbols) {
        this.errorsList = new ErrorList(document.getElementById(DomIds.ERROR_LIST)!);
        this.result = new ResultBox(document.getElementById(DomIds.RESULT_BOX)!);
        this.inputElement = document.getElementById(DomIds.EXPRESSION_INPUT) as HTMLInputElement;

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
            .addClass(ClassNames.BTN_OUTLINE_SECONDARY)
            .addClass(ClassNames.EQUAL_BUTTON)
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