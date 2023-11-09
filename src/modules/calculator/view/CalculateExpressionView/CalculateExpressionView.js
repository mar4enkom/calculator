import {Operations} from "../../../../../userConfig/operations/constants/operations.js";
import {InsertionModes, OperationButton} from "../helpers/OperationButton.js";
import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {CalculatorUIBuilder} from "../helpers/CalculatorUIBuilder.js";
import {ObservableType} from "../../shared/constants.js";
import {getNumberColumnItems} from "../utils/getNumberColumnItems.js";
import {CalculatorViewEvents} from "../helpers/CalculatorViewEvents.js";
import {CalculatorUI} from "../helpers/CalculatorUI.js";
import {KeyboardEventListenersBinder} from "../helpers/KeyboardEventListenersBinder.js";

export class CalculateExpressionView {
    constructor(controller, model, config) {
        this.ui = new CalculatorUI();
        this.events = new CalculatorViewEvents(controller);
        this.uiBuilder = new CalculatorUIBuilder(this.ui, this.events, config);

        new KeyboardEventListenersBinder(this.ui, this.events).bindEvents();

        model.subscribe(ObservableType.CALCULATION_RESULT, this.renderResult.bind(this));
    }

    render() {
        this.uiBuilder.render();
    }

    renderResult(result) {
        if(result?.errors != null) return this.uiBuilder.renderErrors(result.errors)
        if(result != null) return this.uiBuilder.renderResult(result);
        this.uiBuilder.renderResult("");
    }
}