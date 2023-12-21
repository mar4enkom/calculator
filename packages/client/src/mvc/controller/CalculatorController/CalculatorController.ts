import {CalculatorModel} from "mvc/model/CalculatorModel";
import {Events} from "mvc/events";
import {ExpressionCalculator} from "../../../calculateExpression/types";

// TODO: add aliases
export class CalculatorController {
    private model: CalculatorModel;
    private expressionCalculator: ExpressionCalculator;
    constructor(model: CalculatorModel, expressionCalculator: ExpressionCalculator) {
        this.model = model;
        this.expressionCalculator = expressionCalculator;

        this.model.subscribe(Events.CALCULATE_EXPRESSION, this.handleCalculateExpression.bind(this));
    }

    async handleCalculateExpression(expression: string): Promise<void> {
        const calculationResult =
            await this.expressionCalculator.calculateExpression({expression });

        if('errors' in calculationResult) {
            this.model.setErrors(calculationResult.errors);
        } else {
            this.model.setResult(calculationResult.result);
        }
    }
}
