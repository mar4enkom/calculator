import {CalculationEvents} from "mvc/calculationEvents.js";
import {OperationCategoryName} from "userConfig/constants/operationCategoryName.ts";
import {BUTTONS_PER_COLUMN} from "mvc/view/constants/constants.ts";
import {bindKeyboardListener} from "mvc/view/utils/bindKeyboardListener.js";

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
        const secondaryOperationList = this.config[OperationCategoryName.OPERATOR].slice(BUTTONS_PER_COLUMN + 1);
        const constantList = this.config[OperationCategoryName.CONSTANT];
        const signList = this.config[OperationCategoryName.SIGN];
        const functionList = this.config[OperationCategoryName.FUNCTION];
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

        const primaryOperationList = this.config[OperationCategoryName.OPERATOR].slice(0, BUTTONS_PER_COLUMN + 1);
        this.viewService.renderOperationList(primaryOperationList, this.viewService.ui.operationsColumn);
    }
}