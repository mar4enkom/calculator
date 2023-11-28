import {removeSpaces} from "../utils/prepareExpression/removeSpaces.js";
import {CalculationEvents} from "../../shared/constants/constants.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {toLowerCase} from "../utils/prepareExpression/toLowerCase.js";
import {Observable} from "../../model/helpers/Observable.js";
import {resolveNumberAliases} from "../utils/prepareExpression/resolveNumberAliases.js";
import {Numbers} from "UserConfig/constants/constants.js";
import {CalculateExpressionService} from "../../services/CalculateExpressionService/index.js";
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
            return this.model.notify(CalculationEvents.DISPLAY_RESULT, { errors: validationErrors });
        }

        const preparedExpression = this.transformExpression(expression);
        const calculationService = new CalculateExpressionService(this.operationsConfig);
        const calculationResult = calculationService.calculate(preparedExpression);
        this.model.notify(CalculationEvents.DISPLAY_RESULT, calculationResult);
    }

    transformExpression(expression) {
        const formattedExpression = compose(removeSpaces, toLowerCase)(expression);
        return resolveNumberAliases(expression, Numbers);
    }
}
