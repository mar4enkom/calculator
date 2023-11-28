import {removeSpaces} from "../utils/prepareExpression/removeSpaces.js";
import {InitialValidationService} from "../helpers/InitialValidationService/InitialValidationService.js";
import {CalculationEvents} from "../../shared/constants.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {toLowerCase} from "../utils/prepareExpression/toLowerCase.js";
import {Observable} from "../../model/helpers/Observable.js";
import {resolveNumberAliases} from "../utils/prepareExpression/resolveNumberAliases.js";
import {Numbers} from "UserConfig/constants/constants.js";
import {CalculateExpressionService} from "../../model/index.js";

export class CalculateExpressionController {
    constructor(model, operationsConfig) {
        this.operationsConfig = operationsConfig
        this.model = model;
        this.model.subscribe(CalculationEvents.CALCULATE_EXPRESSION, this.handleCalculateExpression.bind(this));
    }

    handleCalculateExpression(expression) {
        const preparedExpression = this.prepareExpression(expression);

        if(preparedExpression?.errors?.length > 0) {
            return this.model.notify(CalculationEvents.DISPLAY_RESULT, preparedExpression);
        }

        const calculationService = new CalculateExpressionService(this.operationsConfig);
        const calculationResult = calculationService.calculate(preparedExpression);
        this.model.notify(CalculationEvents.DISPLAY_RESULT, calculationResult);
    }

    prepareExpression(expression) {
        const prepareExpression = compose(
            this.formatExpression,
            this.transformExpression,
            this.validateExpression
        );
        return prepareExpression(expression);
    }

    validateExpression(expression) {
        const validationService = InitialValidationService.getInstance();
        const validationErrors = validationService.getInitialValidationErrors(expression);
        return validationErrors.length > 0
            ? { errors: validationErrors }
            : expression;
    }

    transformExpression(expression) {
        return resolveNumberAliases(expression, Numbers);
    }

    formatExpression(expression) {
        return compose(removeSpaces, toLowerCase)(expression);
    }
}
