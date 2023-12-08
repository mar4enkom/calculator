import {Digits} from "UserConfig/constants/constants.js";
import {initialValidations} from "Mvc/controller/utils/initialValidations/initialValidations.js";
import {getValidationErrors} from "Shared/utils/getValidationErrors.js";
import {resolveNumberAliases} from "Mvc/controller/utils/prepareExpression/resolveNumberAliases.js";
import {CalculationEvents} from "Mvc/calculationEvents.js";

export class CalculatorController {
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
