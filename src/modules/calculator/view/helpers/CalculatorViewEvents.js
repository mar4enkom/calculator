export class CalculatorViewEvents {
    constructor(controller) {
        this.controller = controller;
    }

    handleCalculateExpression(inputValue) {
        this.controller.handleCalculateExpression(inputValue);
    }
}