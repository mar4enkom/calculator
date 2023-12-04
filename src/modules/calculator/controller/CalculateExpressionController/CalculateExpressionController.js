import {Numbers} from "@userConfig/constants/constants.js";
import {removeSpaces} from "@calculator/ExpressionCalculator/utils/removeSpaces.js";
import {toLowerCase} from "@calculator/ExpressionCalculator/utils/toLowerCase.js";
import {Observable} from "@calculator/model/helpers/Observable.js";
import {resolveNumberAliases} from "@calculator/controller/utils/prepareExpression/resolveNumberAliases.js";
import {ExpressionCalculator} from "@calculator/ExpressionCalculator/index.js";
import {initialValidations} from "@calculator/controller/utils/initialValidations/initialValidations.js";
import {CalculationEvents} from "@calculator/shared/constants/constants.js";
import {getValidationErrors} from "@calculator/shared/utils/getValidationErrors.js";

export class CalculateExpressionController {
    constructor(model, operationsConfig) {
        this.operationsConfig = operationsConfig
        this.model = model;
        this.model.subscribe(CalculationEvents.CALCULATE_EXPRESSION, this.handleCalculateExpression.bind(this));
    }

    handleCalculateExpression(expression) {
        const validationErrors = getValidationErrors(expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return this.model.setErrors(validationErrors);
        }

        const transformedExpression = this.transformExpression(expression);
        const expressionCalculator = new ExpressionCalculator(this.operationsConfig);
        const calculationResult = expressionCalculator.calculate(transformedExpression);

        if(calculationResult?.errors?.length > 0) {
            this.model.setErrors(calculationResult.errors);
        } else {
            this.model.setResult(calculationResult.result);
        }
    }

    transformExpression(expression) {
        return resolveNumberAliases(expression, Numbers);
    }
}
