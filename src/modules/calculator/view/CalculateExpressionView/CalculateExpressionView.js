import {Operations} from "../../../../../userConfig/operations/constants/operations.js";
import {InsertionModes, OperationButton} from "../helpers/OperationButton.js";
import {getOperationsRenderInfo} from "../utils/getOperationsRenderInfo.js";
import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {CalculateExpressionRenderer} from "../helpers/CalculateExpressionRenderer.js";
import {ObservableType} from "../../shared/constants.js";

export class CalculateExpressionView {
    constructor(controller, model, config) {
        this.config = config;
        this.controller = controller;

        this.inputElement = document.getElementById("calculation-input");
        this.errorsListElement = document.getElementById("errors-list");
        this.resultElement = document.getElementById("calculation-result");

        this.#bindEventListeners();
        this.inputElement.focus();

        model.subscribe(ObservableType.CALCULATION_RESULT, this.renderResult.bind(this));
    }

    render() {
        const renderer = new CalculateExpressionRenderer(this);
        renderer.render();
    }

    handleCalculateExpression() {
        const currentExpression = this.inputElement.value;
        this.controller.handleCalculateExpression(currentExpression);
        this.inputElement.focus();
    }

    #renderValidationErrors(errorsList) {
        errorsList?.forEach(errorString => {
            const errorLi = document.createElement("li");
            errorLi.textContent = errorString.message;
            this.errorsListElement.appendChild(errorLi);
        });
    }

    renderResult(result) {
        this.#deleteErrorListItems();

        if(result?.errors != null) return this.#renderValidationErrors(result.errors)
        if(result != null) return this.resultElement.textContent = `= ${result}`;
        this.resultElement.textContent = "";
    }

    #bindEventListeners() {
        this.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
                this.handleCalculateExpression();
            }
        });
    }

    #deleteErrorListItems() {
        const errorsLi = this.errorsListElement.querySelectorAll("li");
        errorsLi.forEach(liElement => liElement.remove());
    }
}