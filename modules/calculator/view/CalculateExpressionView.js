import {ObservableType} from "../model/CalculateExpressionService.js";

export class CalculateExpressionView {
    constructor(model) {
        this.model = model;
        model.subscribe(ObservableType.CALCULATION_RESULT, this.#renderResult);
        model.subscribe(ObservableType.VALIDATION_ERROR, this.#renderValidationError);
    }

    #renderValidationError(errorText) {
        console.log(errorText)
    }

    #renderResult(result) {
        console.log(result);
    }
}