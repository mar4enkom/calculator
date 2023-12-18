import {BUTTONS_PER_COLUMN} from "mvc/view/constants/constants";
import {bindKeyboardListener} from "mvc/view/utils/bindKeyboardListener";
import {CalculatorModel} from "../model/CalculatorModel";
import {UserConfig} from "userConfig/operations/types";
import {CalculatorViewService} from "shared/types/types";
import {Events} from "mvc/events";

export class CalculatorView {
    private viewService: CalculatorViewService;
    private model: CalculatorModel;
    private config: UserConfig;

    constructor(viewService: CalculatorViewService, model: CalculatorModel, config: UserConfig) {
        this.viewService = viewService;
        this.model = model;
        this.config = config;

        this.bindEvents();
        this.bindKeyboardListeners();
    }

    bindEvents(): void {
        this.model.subscribe<Events.RESULT_UPDATED>(
            Events.RESULT_UPDATED,
            this.viewService.ui.result.render
        );
        this.model.subscribe<Events.ERRORS_UPDATED>(
            Events.ERRORS_UPDATED,
            this.viewService.ui.errorsList.render
        );
    }

    bindKeyboardListeners(): void {
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewService.ui.inputElement,
            onKeydown: () => {
                this.model.onCalculateExpression(this.viewService.ui.getExpression());
            }
        });
    }

    render(): void {
        const secondaryOperationList = this.config.operator.slice(BUTTONS_PER_COLUMN + 1);
        const constantList = this.config.constant;
        const signList = this.config.sign;
        const functionList = this.config.function;
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

        const primaryOperationList = this.config.operator.slice(0, BUTTONS_PER_COLUMN + 1);
        this.viewService.renderOperationList(primaryOperationList, this.viewService.ui.operationsColumn);
    }
}