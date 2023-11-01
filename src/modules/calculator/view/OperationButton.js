export const InsertionModes = {
    TEXT: "text",
    PARENTHESES: "parentheses",
    TEXT_WITH_PARENTHESES: "textWithParentheses",
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
        let insertionFunc;
        switch (insertionMode) {
            case InsertionModes.TEXT:
                this.insert = this.#insertText;
                break;
            case InsertionModes.PARENTHESES:
                this.insert = this.#insertParentheses;
                break;
            case InsertionModes.TEXT_WITH_PARENTHESES:
                this.insert = this.#insertTextWithParentheses;
                break;
            default:
                throw new Error("No such an insertion mode in the list");
        }
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
        const textToInsert = `()`;
        const newValue = inputValue.substring(0, cursorStart) + textToInsert + inputValue.substring(cursorEnd);
        this.inputElement.value = newValue;
        this.inputElement.setSelectionRange(cursorStart + textToInsert.length - 1, cursorStart + textToInsert.length - 1);
        this.inputElement.focus();
    }

    #insertTextWithParentheses() {
        this.#insertText();
        this.#insertParentheses();
    }
}