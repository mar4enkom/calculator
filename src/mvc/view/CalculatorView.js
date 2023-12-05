import {CalculationEvents} from "Calculator/mvc/calculationEvents.js";
import {Operations} from "UserConfig/constants/operations.js";
import {BUTTONS_PER_COLUMN} from "./constants/constants.js";
import {bindKeyboardListener} from "./utils/bindKeyboardListener.js";

export class CalculatorView {
    constructor(viewService, model, config) {
        this.viewService = viewService;
        this.model = model;
        this.config = config;

        this.bindEvents();
        this.bindKeyboardListeners();
    }

    bindEvents() {
        this.model.subscribe(CalculationEvents.RESULT_UPDATED, this.viewService.ui.result.render);
        this.model.subscribe(CalculationEvents.ERRORS_UPDATED, this.viewService.ui.errorsList.render);
    }

    bindKeyboardListeners() {
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewService.ui.inputElement,
            onKeydown: () => {
                this.model.onCalculateExpression(this.viewService.ui.getExpression());
            }
        });
    }

    render() {
        const secondaryOperationList = this.config[Operations.OPERATOR].slice(BUTTONS_PER_COLUMN + 1);
        const constantList = this.config[Operations.CONSTANT];
        const signList = this.config[Operations.SIGN];
        const functionList = this.config[Operations.FUNCTION];
        this.viewService.renderConstantButtonList(constantList, this.viewService.ui.functionsColumn);
        this.viewService.renderSignButtonList(signList, this.viewService.ui.functionsColumn);
        this.viewService.renderOperationList(secondaryOperationList, this.viewService.ui.functionsColumn);
        this.viewService.renderFunctionButtonList(functionList, this.viewService.ui.functionsColumn);

        this.viewService.renderDigitButtonList(this.viewService.ui.numbersColumn);
        this.viewService.renderParenthesesButton(this.viewService.ui.numbersColumn);
        this.viewService.renderDotButton(this.viewService.ui.numbersColumn);
        this.viewService.renderCEButton(this.viewService.ui.numbersColumn);
        this.viewService.renderEqualsButton({
            onClick: () => this.model.onCalculateExpression(this.viewService.ui.getExpression()),
            root: this.viewService.ui.numbersColumn
        });

        const primaryOperationList = this.config[Operations.OPERATOR].slice(0, BUTTONS_PER_COLUMN + 1);
        this.viewService.renderOperationList(primaryOperationList, this.viewService.ui.operationsColumn);
    }
}