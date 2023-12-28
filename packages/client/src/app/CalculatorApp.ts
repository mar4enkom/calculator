import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {CalculatorModel} from "../calculateExpression/mvc/model/CalculatorModel";
import {CalculateEvents} from "../calculateExpression/mvc/calculateEvents";
import {CalculatorViewService as CalculatorViewServiceInterface} from "viewService/types";
import {CalculatorViewService} from "viewService/CalculatorViewService/CalculatorViewService";
import {UserConfigModel} from "../userConfig/mvc/model";
import {UserConfigEvents} from "../userConfig/mvc/userConfigEvents";

export class CalculatorApp {
    private viewService: CalculatorViewServiceInterface | undefined;
    private calculatorModel: CalculatorModel;
    private userConfigModel: UserConfigModel;
    private loader: HTMLDivElement | undefined;

    constructor(
        ViewService: typeof CalculatorViewService,
        calculatorModel: CalculatorModel,
        userConfigModel: UserConfigModel
    ) {
        this.calculatorModel = calculatorModel;
        this.userConfigModel = userConfigModel;

        this.userConfigModel.fetchUserConfig();

        this.render(true);

        this.userConfigModel.subscribe(UserConfigEvents.USER_CONFIG_UPDATED, (config) => {
            if(config) {
                this.viewService = new ViewService(config.symbols, config.digitSymbols);
                this.bindEvents();
                this.bindKeyboardListeners();
                this.render(false);
            }
        });
    }

    bindEvents(): void {
        if(this.viewService == null) {
            throw new Error("viewService has not been initialized");
        }
        this.calculatorModel.subscribe<CalculateEvents.RESULT_UPDATED>(
            CalculateEvents.RESULT_UPDATED,
            this.viewService!.ui.result.render
        );
        this.calculatorModel.subscribe<CalculateEvents.ERRORS_UPDATED>(
            CalculateEvents.ERRORS_UPDATED,
            this.viewService!.ui.errorsList.render
        );
        // this.model.subscribe<Events.USER_CONFIG_UPDATED>(
        //     Events.USER_CONFIG_UPDATED,
        //     (userConfigModel) => this.userConfigModel = userConfigModel
        // );
        this.calculatorModel.subscribe<CalculateEvents.LOADING_UPDATED>(
            CalculateEvents.LOADING_UPDATED,
            () => {console.log("loading...")}
        )
    }

    bindKeyboardListeners(): void {
        if(this.viewService == null) {
            throw new Error("viewService has not been initialized");
        }
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewService!.ui.inputElement,
            onKeydown: () => {
                this.calculatorModel.onCalculateExpression(this.viewService!.ui.getExpression());
            }
        });
    }

    render(isLoading: boolean = false): void {
        const BUTTONS_PER_COLUMN = 4;
        if (isLoading) {
            this.loader = document.createElement("div")
            this.loader.textContent = "Loading...";
            const loaderWrapper = document.getElementById("root") as HTMLDivElement;
            loaderWrapper.appendChild(this.loader);
            return;
        } else {
            const loaderWrapper = document.getElementById("root") as HTMLDivElement;
            if (this.loader && loaderWrapper.contains(this.loader)) {
                loaderWrapper.removeChild(this.loader);
            }
        }
        if(this.viewService == null) {
            throw new Error("viewService has not been initialized");
        }
        const operationsConfig = this.userConfigModel.getUserConfig()!.operations;

        console.log("render")

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
            onClick: () => this.calculatorModel.onCalculateExpression(this.viewService!.ui.getExpression()),
            root: this.viewService.ui.numbersColumn
        });

        const primaryOperationList = operationsConfig.operator.slice(0, BUTTONS_PER_COLUMN + 1);
        this.viewService.renderOperationList(primaryOperationList, this.viewService.ui.operationsColumn);
    }
}