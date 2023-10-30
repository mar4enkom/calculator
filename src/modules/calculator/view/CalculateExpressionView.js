import {ObservableType} from "../model/CalculateExpressionService.js";
import {Operations} from "../../../../userConfig/operations/constants.js";

export class CalculateExpressionView {
    constructor(model) {
        this.model = model;

        this.inputElement = document.getElementById("calculation-input");
        this.errorsListElement = document.getElementById("errors-list");
        this.resultElement = document.getElementById("calculation-result");

        model.subscribe(ObservableType.CALCULATION_RESULT, this.#renderResult.bind(this));
        model.subscribe(ObservableType.VALIDATION_ERROR, this.#renderValidationErrors.bind(this));

        this.#renderFunctionButtons();
    }

    #renderValidationErrors(errorsList) {
        errorsList?.forEach(errorString => {
            const errorLi = document.createElement("li");
            errorLi.textContent = errorString;
            this.errorsListElement.appendChild(errorLi);
        });
    }

    #renderResult(result) {
        this.resultElement.textContent = `= ${result}`;
    }

    #createButton(text) {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-light");
        button.textContent = text;
        button.addEventListener("click", () => {
            this.inputElement.value += text;
        });
        return button;
    }

    #renderFunctionButtons() {
        const wrapper = document.getElementById("functions-buttons-wrapper");
        Object.values(this.model.config[Operations.FUNCTION].operations).forEach((operationProps) => {
            const button = this.#createButton(operationProps.sign);
            wrapper.appendChild(button);
        })
    }
}