import {Symbols} from "userConfig/constants/constants";
import {Maybe} from "shared/types/typesUtils";

export enum InsertionModes {
    TEXT = "text",
    PARENTHESES = "parentheses",
    TEXT_BEFORE_PARENTHESES = "textBeforeParentheses",
    TEXT_AFTER_PARENTHESES = "textAfterParentheses",
}

interface IOperationButton {
    create: () => HTMLElement;
    addClass: (className: string) => OperationButton;
}

export class OperationButton implements IOperationButton{
    private textContent: string;
    private inputElement: HTMLInputElement;
    private customClasses: string[] = [];
    private insert: Maybe<() => void>;
    private handleClick: Maybe<() => void>;

    constructor(textContent: string, inputElement: HTMLInputElement) {
        this.textContent = textContent;
        this.inputElement = inputElement;
    }

    create() {
        const button = document.createElement("button");

        button.classList.add("btn");
        button.classList.add("btn-light");

        for (const className of this.customClasses) {
            button.classList.add(className)
        }

        button.textContent = this.textContent;

        button.addEventListener("click", () => {
            this.insert?.();
            this.handleClick?.();
        });

        return button;
    }

    addClass(className: string) {
        this.customClasses.push(className);
        return this;
    }

    addOnClick(onClick: () => void) {
        this.handleClick = onClick;
        return this;
    }

    addInsertionMode(insertionMode: InsertionModes) {
        const functionsByInsertionMode = {
            [InsertionModes.TEXT]: this.insertText,
            [InsertionModes.PARENTHESES]: this.insertParentheses,
            [InsertionModes.TEXT_BEFORE_PARENTHESES]: this.insertTextBeforeParentheses,
            [InsertionModes.TEXT_AFTER_PARENTHESES]: this.insertTextAfterParentheses,
        }
        const insertFunc = functionsByInsertionMode[insertionMode];
        if(insertFunc == null) throw new Error("No such an insertion mode in the list");
        this.insert = insertFunc;

        return this;
    }

    private getInputProps(){
        const cursorStart = this.inputElement.selectionStart;
        const cursorEnd = this.inputElement.selectionEnd;
        const inputValue = this.inputElement.value;

        return {
            cursorStart: cursorStart ?? inputValue.length,
            cursorEnd: cursorEnd ?? inputValue.length,
            inputValue
        };
    }

    private insertText() {
        const { cursorStart, cursorEnd, inputValue } = this.getInputProps();
        const newValue = inputValue.substring(0, cursorStart) + this.textContent + inputValue.substring(cursorEnd);
        this.inputElement.value = newValue;
        this.inputElement.setSelectionRange(cursorStart + this.textContent.length, cursorStart + this.textContent.length);
        this.inputElement.focus();
    }

    private insertParentheses() {
        const { cursorStart, cursorEnd, inputValue } = this.getInputProps();
        const textToInsert = `${Symbols.LP}${Symbols.RP}`;
        const newValue = inputValue.substring(0, cursorStart) + textToInsert + inputValue.substring(cursorEnd);
        this.inputElement.value = newValue;
        this.inputElement.setSelectionRange(cursorStart + textToInsert.length - 1, cursorStart + textToInsert.length - 1);
        this.inputElement.focus();
    }

    private insertTextBeforeParentheses() {
        this.insertText();
        this.insertParentheses();
    }

    private insertTextAfterParentheses() {
        const { cursorStart } = this.getInputProps();
        this.insertParentheses();
        this.inputElement.setSelectionRange(cursorStart + this.textContent.length + 1, cursorStart + this.textContent.length + 1);
        this.insertText();
        this.inputElement.setSelectionRange(this.getInputProps().cursorStart - this.textContent.length - 1, this.getInputProps().cursorStart - this.textContent.length - 1);
    }
}