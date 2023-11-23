import {CalculationEvents} from "../../shared/constants.js";

export class CalculatorViewEvents {
    constructor(model) {
        this.model = model;
    }

    handleCalculateExpression(inputValue) {
        this.model.notify(CalculationEvents.CALCULATE_EXPRESSION, inputValue);
    }
}