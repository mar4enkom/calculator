import {CalculateExpressionPayload, getValidationErrors, TestDigitSymbols} from "@calculator/common";
import {ExpressionCalculator} from "../calculateExpression/types";
import {initialValidations} from "../calculateExpression/utils/initialValidations/initialValidations";
import {applyNumberAliasesForPayload} from "../calculateExpression/utils/prepareExpression/resolveNumberAliases";
import {ServerMultiError} from "../../shared/helpers/ServerMultiError";
import {handleUnknownError} from "../../shared/utils/handleUnknownError";
import {CalculatorVariables} from "../observer/types";

export class CalculateExpressionController {
    private variables: CalculatorVariables;
    private expressionCalculator: ExpressionCalculator;
    constructor(variables: CalculatorVariables, expressionCalculator: ExpressionCalculator) {
        this.variables = variables;
        this.expressionCalculator = expressionCalculator;

        this.calculateExpressionController = this.calculateExpressionController.bind(this);
    }

    async calculateExpressionController(payload: CalculateExpressionPayload) {
        try {
            this.variables.calculatorLoading.setValue(true);
            const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
            if(validationErrors) {
                return this.variables.calculatorError.setValue(new ServerMultiError(validationErrors));
            }

            const transformedPayload = applyNumberAliasesForPayload({expression: payload.expression}, TestDigitSymbols)
            const response = await this.expressionCalculator.calculateExpression(transformedPayload);
            this.variables.calculatorValue.setValue(response);
        } catch (e) {
            const error = handleUnknownError(e);
            this.variables.calculatorError.setValue(error)
        } finally {
            this.variables.calculatorLoading.setValue(false);
        }
    }
}