import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";

export const InsertionModes = {
    TEXT: "text",
    PARENTHESES: "parentheses",
    TEXT_BEFORE_PARENTHESES: "textBeforeParentheses",
    TEXT_AFTER_PARENTHESES: "textAfterParentheses",

}

export class OperationButton {
    constructor(textContent, inputElement) {
        this.textContent = textContent;
        this.inputElement = inputElement;
    }

    create() {
        const button = document.createElement("button");

        button.classList.add("btn");
        button.classList.add("btn-light");
        if(this.customClass) button.classList.add(this.customClass);

        button.textContent = this.textContent;

        button.addEventListener("click", () => {
            this.insert?.();
            this.handleClick?.();
        });

        return button;
    }

    addClass(className) {
        this.customClass = className;
        return this;
    }

    addOnClick(onClick) {
        this.handleClick = onClick;
        return this;
    }

    addInsertionMode(insertionMode) {
        const functionsByInsertionMode = {
            [InsertionModes.TEXT]: this.#insertText,
            [InsertionModes.PARENTHESES]: this.#insertParentheses,
            [InsertionModes.TEXT_BEFORE_PARENTHESES]: this.#insertTextBeforeParentheses,
            [InsertionModes.TEXT_AFTER_PARENTHESES]: this.#insertTextAfterParentheses,
        }
        const insertFunc = functionsByInsertionMode[insertionMode];
        if(insertFunc == null) throw new Error("No such an insertion mode in the list");
        this.insert = insertFunc;

        return this;
    }

    #getInputProps(){
        const cursorStart = this.inputElement.selectionStart;
        const cursorEnd = this.inputElement.selectionEnd;
        const inputValue = this.inputElement.value;

        return { cursorStart, cursorEnd, inputValue };
    }

    #insertText() {
        const { cursorStart, cursorEnd, inputValue } = this.#getInputProps();
        const newValue = inputValue.substring(0, cursorStart) + this.textContent + inputValue.substring(cursorEnd);
        this.inputElement.value = newValue;
        this.inputElement.setSelectionRange(cursorStart + this.textContent.length, cursorStart + this.textContent.length);
        this.inputElement.focus();
    }

    #insertParentheses() {
        const { cursorStart, cursorEnd, inputValue } = this.#getInputProps();
        const textToInsert = `${Symbols.LP}${Symbols.RP}`;
        const newValue = inputValue.substring(0, cursorStart) + textToInsert + inputValue.substring(cursorEnd);
        this.inputElement.value = newValue;
        this.inputElement.setSelectionRange(cursorStart + textToInsert.length - 1, cursorStart + textToInsert.length - 1);
        this.inputElement.focus();
    }

    #insertTextBeforeParentheses() {
        this.#insertText();
        this.#insertParentheses();
    }

    #insertTextAfterParentheses() {
        const { cursorStart } = this.#getInputProps();
        this.#insertParentheses();
        this.inputElement.setSelectionRange(cursorStart + this.textContent.length + 1, cursorStart + this.textContent.length + 1);
        this.#insertText();
        this.inputElement.setSelectionRange(this.#getInputProps().cursorStart - this.textContent.length - 1, this.#getInputProps().cursorStart - this.textContent.length - 1);
    }
}