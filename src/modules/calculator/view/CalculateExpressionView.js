import {ObservableType} from "../model/CalculateExpressionService.js";
import {Operations} from "../../../../userConfig/operations/constants.js";
import {InsertionModes, OperationButton} from "./OperationButton.js";
import {getOperationsRenderInfo} from "./utils/getOperationsRenderInfo.js";
import {Symbols} from "../../../constants/constants.js";
import {CalculateExpressionRenderer} from "./CalculateExpressionRenderer.js";

export class CalculateExpressionView {
    constructor(model, controller) {
        this.config = model.config;
        this.controller = controller;

        this.inputElement = document.getElementById("calculation-input");
        this.errorsListElement = document.getElementById("errors-list");
        this.resultElement = document.getElementById("calculation-result");

        //Q: is it better to subscribe to the model in controller or in view?
        model.subscribe(ObservableType.CALCULATION_RESULT, this.#renderResult.bind(this));
        model.subscribe(ObservableType.VALIDATION_ERROR, this.#renderValidationErrors.bind(this));

        this.#bindEventListeners();
        this.inputElement.focus();
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

    #bindEventListeners() {
        this.inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
                this.handleCalculateExpression();
            }
        });
    }

    #renderValidationErrors(errorsList) {
        this.#deleteErrorListItems();
        errorsList?.forEach(errorString => {
            const errorLi = document.createElement("li");
            errorLi.textContent = errorString;
            this.errorsListElement.appendChild(errorLi);
        });
    }

    #renderResult(result) {
        this.#deleteErrorListItems();
        this.resultElement.textContent = `= ${result}`;
    }

    #deleteErrorListItems() {
        const errorsLi = this.errorsListElement.querySelectorAll("li");
        errorsLi.forEach(liElement => liElement.remove());
    }
}