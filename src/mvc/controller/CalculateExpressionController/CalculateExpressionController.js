import {Digits} from "UserConfig/constants/constants.js";
import {removeSpaces} from "Calculator/ExpressionCalculator/utils/removeSpaces.js";
import {toLowerCase} from "Calculator/ExpressionCalculator/utils/toLowerCase.js";
import {ExpressionCalculator} from "Calculator/ExpressionCalculator/index.js";
import {initialValidations} from "Calculator/mvc/controller/utils/initialValidations/initialValidations.js";
import {getValidationErrors} from "Calculator/shared/utils/getValidationErrors.js";
import {resolveNumberAliases} from "Calculator/mvc/controller/utils/prepareExpression/resolveNumberAliases.js";
import {CalculationEvents} from "Calculator/mvc/calculationEvents.js";

export class CalculateExpressionController {
    constructor(model, calculationService) {
        this.model = model;
        this.calculationService = calculationService;

        this.model.subscribe(CalculationEvents.CALCULATE_EXPRESSION, this.handleCalculateExpression.bind(this));
    }

    handleCalculateExpression(expression) {
        const validationErrors = getValidationErrors(expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return this.model.setErrors(validationErrors);
        }

        const transformedExpression = this.transformExpression(expression);
        const calculationResult = this.calculationService.calculate(transformedExpression);

        if(calculationResult?.errors?.length > 0) {
            this.model.setErrors(calculationResult.errors);
        } else {
            this.model.setResult(calculationResult.result);
        }
    }

    transformExpression(expression) {
        return resolveNumberAliases(expression, Digits);
    }
}
