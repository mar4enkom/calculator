export class KeyboardEventListenersBinder {
    constructor(ui, events) {
        this.ui = ui;
        this.events = events;
    }

    bindEvents() {
        this.ui.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
                const currentExpression = this.ui.getExpression();
                this.events.handleCalculateExpression(currentExpression);
            }
        });
    }
}