export class CalculatorUI {
    constructor() {
        this.errorsListElement = document.getElementById("errors-list");
        this.resultElement = document.getElementById("calculation-result");
        this.inputElement = document.getElementById("calculation-input");

        this.functionsColumn = document.getElementById("functions-buttons-wrapper");
        this.numbersColumn = document.getElementById("numbers-buttons-wrapper")
        this.operationsColumn = document.getElementById("operations-buttons-wrapper")
    }

    getExpression() {
        return this.inputElement.value;
    }
}