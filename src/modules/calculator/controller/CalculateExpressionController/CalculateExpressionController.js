import {removeSpaces} from "../../model/utils/prepareExpression/removeSpaces.js";
import {InitialValidationService} from "../helpers/InitialValidationService.js";
import {ObservableType} from "../../shared/constants.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {toLowerCase} from "../../model/utils/prepareExpression/toLowerCase.js";
import {Observable} from "../../model/helpers/Observable.js";

export class CalculateExpressionController {
    constructor(model) {
        this.model = model;
    }

    handleCalculateExpression(expression) {
        if(expression == null || expression === "") {
            return this.model.notify(ObservableType.CALCULATION_RESULT, undefined);
        }

        const validationService = InitialValidationService.getInstance();
        const validationErrors = validationService.getInitialValidationErrors(expression);

        if (validationErrors.length > 0) {
            return this.model.notify(ObservableType.CALCULATION_RESULT, validationErrors);
        }

        this.model.notifyCalculationResult(expression);
    }
}
