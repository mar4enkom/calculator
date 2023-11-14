import {Operations} from "UserConfig/constants/operations.js";
import {InsertionModes, OperationButton} from "../helpers/ui/OperationButton.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {CalculatorUIBuilder} from "../helpers/CalculatorUIBuilder.js";
import {ObservableType} from "../../shared/constants.js";
import {getNumberColumnItems} from "../utils/getNumberColumnItems.js";
import {CalculatorViewEvents} from "../helpers/CalculatorViewEvents.js";
import {CalculatorUI} from "../helpers/ui/CalculatorUI.js";
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
        this.ui.errorsList.clear();
        this.ui.result.clear();
        if(result?.errors != null) return this.ui.errorsList.render(result.errors)
        if(result != null) return this.ui.result.render(result);
        this.ui.result.render("");
    }
}