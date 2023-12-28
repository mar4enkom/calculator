import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {CalculatorModel} from "../calculateExpression/mvc/model/CalculatorModel";
import {testConfig, TestDigitSymbols, TestSymbols, UserConfigResponseBody} from "@calculator/common";
import {Events} from "../calculateExpression/mvc/events";
import {CalculatorViewService} from "../calculatorView/types";

export class CalculatorApp {
    private viewService: CalculatorViewService;
    private model: CalculatorModel;
    private config: UserConfigResponseBody | undefined | null;

    constructor(viewService: CalculatorViewService, model: CalculatorModel) {
        this.viewService = viewService;
        this.model = model;
        this.config = {
            operations: testConfig,
            symbols: TestSymbols,
            digitSymbols: TestDigitSymbols
        };

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
        // this.model.subscribe<Events.USER_CONFIG_UPDATED>(
        //     Events.USER_CONFIG_UPDATED,
        //     (config) => this.config = config
        // );
        this.model.subscribe<Events.LOADING_UPDATED>(
            Events.LOADING_UPDATED,
            () => {console.log("loading...")}
        )
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
        const BUTTONS_PER_COLUMN = 4;
        const operationsConfig = this.config?.operations;

        if(!operationsConfig) return;

        const secondaryOperationList = operationsConfig.operator.slice(BUTTONS_PER_COLUMN + 1);
        const constantList = operationsConfig.constant;
        const signList = operationsConfig.sign;
        const functionList = operationsConfig.function;
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

        const primaryOperationList = operationsConfig.operator.slice(0, BUTTONS_PER_COLUMN + 1);
        this.viewService.renderOperationList(primaryOperationList, this.viewService.ui.operationsColumn);
    }
}