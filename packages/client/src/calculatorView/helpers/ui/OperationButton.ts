import {Maybe, Symbols} from "@calculator/common";

export type InsertionMode =
    | "text"
    | "parentheses"
    | "textBeforeParentheses"
    | "textAfterParentheses";

interface IOperationButton {
    create(): HTMLElement;
    addClass(className: string): OperationButton;
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

    create(): HTMLButtonElement {
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

    addClass(className: string): this {
        this.customClasses.push(className);
        return this;
    }

    addOnClick(onClick: () => void): this {
        this.handleClick = onClick;
        return this;
    }

    addInsertionMode(insertionMode: InsertionMode, symbols: Symbols): this {
        const functionsByInsertionMode: Record<InsertionMode, () => void> = {
            text: this.insertText,
            parentheses: () => this.insertParentheses(symbols),
            textBeforeParentheses: () => this.insertTextBeforeParentheses(symbols),
            textAfterParentheses: () => this.insertTextAfterParentheses(symbols),
        }
        const insertFunc = functionsByInsertionMode[insertionMode];
        if(insertFunc == null) throw new Error("No such an insertion mode in the list");
        this.insert = insertFunc;

        return this;
    }

    private getInputProps(): {
        cursorStart: number
        cursorEnd: number,
        inputValue: string
    }{
        const cursorStart = this.inputElement.selectionStart;
        const cursorEnd = this.inputElement.selectionEnd;
        const inputValue = this.inputElement.value;

        return {
            cursorStart: cursorStart ?? inputValue.length,
            cursorEnd: cursorEnd ?? inputValue.length,
            inputValue
        };
    }

    private insertText(): void {
        const { cursorStart, cursorEnd, inputValue } = this.getInputProps();
        const newValue = inputValue.substring(0, cursorStart) + this.textContent + inputValue.substring(cursorEnd);
        this.inputElement.value = newValue;
        this.inputElement.setSelectionRange(cursorStart + this.textContent.length, cursorStart + this.textContent.length);
        this.inputElement.focus();
    }

    private insertParentheses(symbols: Symbols): void {
        const { cursorStart, cursorEnd, inputValue } = this.getInputProps();
        const textToInsert = `${symbols.LP}${symbols.RP}`;
        const newValue = inputValue.substring(0, cursorStart) + textToInsert + inputValue.substring(cursorEnd);
        this.inputElement.value = newValue;
        this.inputElement.setSelectionRange(cursorStart + textToInsert.length - 1, cursorStart + textToInsert.length - 1);
        this.inputElement.focus();
    }

    private insertTextBeforeParentheses(symbols: Symbols): void {
        this.insertText();
        this.insertParentheses(symbols);
    }

    private insertTextAfterParentheses(symbols: Symbols): void {
        const { cursorStart } = this.getInputProps();
        this.insertParentheses(symbols);
        this.inputElement.setSelectionRange(cursorStart + this.textContent.length + 1, cursorStart + this.textContent.length + 1);
        this.insertText();
        this.inputElement.setSelectionRange(this.getInputProps().cursorStart - this.textContent.length - 1, this.getInputProps().cursorStart - this.textContent.length - 1);
    }
}