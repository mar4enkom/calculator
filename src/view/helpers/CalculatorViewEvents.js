import {CalculationEvents} from "Shared/constants/constants.js";

export class CalculatorViewEvents {
    constructor(model) {
        this.model = model;
    }

    handleCalculateExpression(inputValue) {
        this.model.calculateExpression(inputValue);
    }
}