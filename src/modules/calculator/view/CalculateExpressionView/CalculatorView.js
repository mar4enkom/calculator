import {Operations} from "@userConfig/constants/operations.js";
import {InsertionModes, OperationButton} from "../helpers/ui/OperationButton.js";
import {Symbols} from "@userConfig/constants/constants.js";
import {CalculatorUIBuilder} from "../helpers/CalculatorUIBuilder.js";
import {getNumberColumnItems} from "../utils/getNumberColumnItems.js";
import {CalculatorUI} from "../helpers/ui/CalculatorUI.js";
import {KeyboardEventListenersBinder} from "../helpers/KeyboardEventListenersBinder.js";
import {CalculationEvents} from "../../shared/constants/constants.js";

export class CalculatorView {
    constructor(model, config) {
        this.ui = new CalculatorUI();
        this.uiBuilder = new CalculatorUIBuilder(this.ui, model, config);

        new KeyboardEventListenersBinder(this.ui, model).bindEvents();

        model.subscribe(CalculationEvents.RESULT_UPDATED, this.ui.result.render.bind(this.ui.result));
        model.subscribe(CalculationEvents.ERRORS_UPDATED, this.ui.errorsList.render.bind(this.ui.errorsList));
    }

    render() {
        this.uiBuilder.renderCalculator();
    }
}