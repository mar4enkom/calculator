import {removeSpaces} from "../../../utils/removeSpaces.js";
import {ValidationService} from "./ValidationService.js";
import {ObservableType} from "../model/CalculateExpressionService.js";

export class CalculateExpressionController {
    constructor(model) {
        this.model = model;
    }

    handleCalculateExpression(expression) {
        const formattedExpression = removeSpaces(expression);
        const validationService = ValidationService.getInstance();
        const validationErrors = validationService.getValidationErrors(formattedExpression);

        if (validationErrors.length > 0) {
            return this.model.notify(ObservableType.VALIDATION_ERROR, validationErrors);
        }

        this.model.calculate(formattedExpression);
    }
}

//controller:
// 1. accepts expr,
// 2. validate.
//      if non valid, set errors for model.
//      else
//

// In model: this.notify() когда в модели выполнена calculate(), мы вызываем notify().
// Перед этим renderResult нужно subscribe к модели.
// In view: this.model.subscribe(renderResult)
// In view: this.model.subscribe(renderError)