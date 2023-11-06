import {removeSpaces} from "../utils/removeSpaces.js";
import {ValidationService} from "../helpers/ValidationService.js";
import {ObservableType} from "../../shared/constants.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {toLowerCase} from "../utils/toLowerCase.js";

export class CalculateExpressionController {
    constructor(model) {
        this.model = model;
    }

    handleCalculateExpression(expression) {
        if(expression == null || expression === "") {
            return this.model.notify(ObservableType.CALCULATION_RESULT, undefined);
        }

        const formattedExpression = this.#formatExpression(expression);
        const validationService = ValidationService.getInstance();
        const validationErrors = validationService.getValidationErrors(formattedExpression);

        if (validationErrors.length > 0) {
            return this.model.notify(ObservableType.VALIDATION_ERROR, validationErrors);
        }

        this.model.process(formattedExpression);
    }

    #formatExpression(expression) {
        const format = compose(removeSpaces, toLowerCase);
        return format(expression);
    }
}
