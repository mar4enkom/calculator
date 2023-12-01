import {removeSpaces} from "../utils/prepareExpression/removeSpaces.js";
import {CalculationEvents} from "../../shared/constants/constants.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {toLowerCase} from "../utils/prepareExpression/toLowerCase.js";
import {Observable} from "../../model/helpers/Observable.js";
import {resolveNumberAliases} from "../utils/prepareExpression/resolveNumberAliases.js";
import {Numbers} from "UserConfig/constants/constants.js";
import {ExpressionCalculator} from "../../ExpressionCalculator/index.js";
import {getValidationErrors} from "../../shared/utils/getValidationErrors.js";
import {InitialValidationsProvider} from "../helpers/InitialValidationsProvider/InitialValidationsProvider.js";

export class CalculateExpressionController {
    constructor(model, operationsConfig) {
        this.operationsConfig = operationsConfig
        this.model = model;
        this.model.subscribe(CalculationEvents.CALCULATE_EXPRESSION, this.handleCalculateExpression.bind(this));
    }

    handleCalculateExpression(expression) {
        const validationList = InitialValidationsProvider.validations;
        const validationErrors = getValidationErrors(expression, ...validationList);
        if(validationErrors?.length > 0) {
            return this.model.errors = validationErrors;
        }

        const transformedExpression = this.transformExpression(expression);
        const expressionCalculator = new ExpressionCalculator(this.operationsConfig);
        const calculationResult = expressionCalculator.calculate(transformedExpression);

        if(calculationResult?.errors?.length > 0) {
            this.model.errors = calculationResult.errors;
        } else {
            this.model.result = calculationResult.result;
        }
    }

    transformExpression(expression) {
        const formattedExpression = compose(removeSpaces, toLowerCase)(expression);
        return resolveNumberAliases(formattedExpression, Numbers);
    }
}
