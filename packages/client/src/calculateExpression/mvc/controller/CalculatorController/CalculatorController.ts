import {CalculatorModel} from "../../model/CalculatorModel";
import {CalculateEvents} from "../../calculateEvents";
import {ExpressionCalculator} from "../../../calculateExpression/types";
import {applyNumberAliasesForPayload} from "../../../calculateExpression/utils/prepareExpression/resolveNumberAliases";
import {TestDigitSymbols} from "@calculator/common";

// TODO: add aliases
export class CalculatorController {
    private model: CalculatorModel;
    private expressionCalculator: ExpressionCalculator;
    constructor(model: CalculatorModel, expressionCalculator: ExpressionCalculator) {
        this.model = model;
        this.expressionCalculator = expressionCalculator;

        this.model.subscribe(CalculateEvents.CALCULATE_EXPRESSION, this.handleCalculateExpression.bind(this));
    }

    async handleCalculateExpression(expression: string): Promise<void> {
        // TODO: TestDigitSymbols -> digit symbols from server
        const transformedPayload = applyNumberAliasesForPayload({expression}, TestDigitSymbols);
        const calculationResult =
            await this.expressionCalculator.calculateExpression(transformedPayload);

        if(calculationResult?.errors != null) {
            this.model.setErrors(calculationResult.errors);
        } else if(calculationResult?.data) {
            this.model.setResult(calculationResult.data);
        }
    }
}
