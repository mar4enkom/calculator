import {Operations} from "UserConfig/constants/operations.js";
import {InsertionModes, OperationButton} from "../helpers/ui/OperationButton.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {CalculatorUIBuilder} from "../helpers/CalculatorUIBuilder.js";
import {CalculationEvents} from "../../shared/constants/constants.js";
import {getNumberColumnItems} from "../utils/getNumberColumnItems.js";
import {CalculatorViewEvents} from "../helpers/CalculatorViewEvents.js";
import {CalculatorUI} from "../helpers/ui/CalculatorUI.js";
import {KeyboardEventListenersBinder} from "../helpers/KeyboardEventListenersBinder.js";

export class CalculateExpressionView {
    constructor(model, config) {
        this.ui = new CalculatorUI();
        this.events = new CalculatorViewEvents(model);
        this.uiBuilder = new CalculatorUIBuilder(this.ui, this.events, config);

        new KeyboardEventListenersBinder(this.ui, this.events).bindEvents();

        model.subscribe(CalculationEvents.DISPLAY_RESULT, this.renderResult.bind(this));
    }

    render() {
        this.uiBuilder.render();
    }

    renderResult(result) {
        this.ui.errorsList.clear();
        this.ui.result.clear();
        if(result?.errors != null) return this.ui.errorsList.render(result.errors)
        if(result != null) return this.ui.result.render(result);
    }
}