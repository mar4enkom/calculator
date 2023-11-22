import {removeSpaces} from "../utils/prepareExpression/removeSpaces.js";
import {InitialValidationService} from "../helpers/InitialValidationService.js";
import {ObservableType} from "../../shared/constants.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {toLowerCase} from "../utils/prepareExpression/toLowerCase.js";
import {Observable} from "../../model/helpers/Observable.js";
import {resolveNumberAliases} from "../utils/prepareExpression/resolveNumberAliases.js";
import {Numbers} from "../../../../../userConfig/constants/constants.js";

export class CalculateExpressionController {
    constructor(model) {
        this.model = model;
    }

    handleCalculateExpression(expression) {
        const prepareExpression = compose(
            this.#formatExpression,
            this.#transformExpression,
            this.#validateExpression
        );
        const preparedExpression = prepareExpression(expression);

        if(preparedExpression?.errors?.length > 0) {
            return this.model.notify(ObservableType.CALCULATION_RESULT, preparedExpression);
        }

        this.model.calculateAndNotify(preparedExpression);
    }

    #validateExpression(expression) {
        const validationService = InitialValidationService.getInstance();
        const validationErrors = validationService.getInitialValidationErrors(expression);
        return validationErrors.length > 0
            ? { errors: validationErrors }
            : expression;
    }

    #transformExpression(expression) {
        return resolveNumberAliases(expression, Numbers);
    }

    #formatExpression(expression) {
        return compose(removeSpaces, toLowerCase)(expression);
    }
}
