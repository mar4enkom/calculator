export class KeyboardEventListenersBinder {
    constructor(ui, model) {
        this.ui = ui;
        this.model = model;
    }

    bindEvents() {
        this.ui.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
                const currentExpression = this.ui.getExpression();
                this.model.calculateExpression(currentExpression);
            }
        });
    }
}