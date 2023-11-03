import {Operations} from "../../../constants/operations.js";
import {InsertionModes, OperationButton} from "./OperationButton.js";
import {getOperationsRenderInfo} from "./utils/getOperationsRenderInfo.js";
import {Symbols} from "../../../constants/constants.js";
import {CalculateExpressionRenderer} from "./CalculateExpressionRenderer.js";

export class CalculateExpressionView {
    constructor(controller, config) {
        this.config = config;
        this.controller = controller;

        this.inputElement = document.getElementById("calculation-input");
        this.errorsListElement = document.getElementById("errors-list");
        this.resultElement = document.getElementById("calculation-result");

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

    renderValidationErrors(errorsList) {
        this.#deleteErrorListItems();
        errorsList?.forEach(errorString => {
            const errorLi = document.createElement("li");
            errorLi.textContent = errorString.message;
            this.errorsListElement.appendChild(errorLi);
        });
    }

    renderResult(result) {
        this.#deleteErrorListItems();
        this.resultElement.textContent = `= ${result}`;
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