import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {CalculatorModel} from "../calculateExpression/mvc/model/CalculatorModel";
import {CalculateEvents} from "../calculateExpression/mvc/calculateEvents";
import {ViewRenderer} from "./ViewRenderer";
import CalculatorBoxSpinner from "viewService/helpers/ui/spinner/CalculatorBoxSpinner/CalculatorBoxSpinner";
import {render} from "viewService/utils/render";
import {RenderIds} from "./constants/renderIds";
import {fetchUserConfig, userConfigLoadingVar, userConfigValueVar} from "../userConfig";

export class CalculatorApp {
    private viewRenderer: ViewRenderer | undefined;
    private calculatorModel: CalculatorModel;

    constructor(calculatorModel: CalculatorModel) {
        this.calculatorModel = calculatorModel;

        this.onMount();
    }

    onMount() {
        userConfigValueVar.subscribe((config) => {
            if(config) {
                this.viewRenderer = new ViewRenderer(this.calculatorModel, config);
                this.bindEvents();
                this.bindKeyboardListeners();
                //TODO: move ids to constants
                render(this.viewRenderer.createCalculator(), RenderIds.CALCULATOR_WRAPPER);
            }
        });

        userConfigLoadingVar.subscribe((loading) => {
            if(loading) render(CalculatorBoxSpinner, RenderIds.CALCULATOR_WRAPPER);
        });

        // calling event should be after subscriptions because
        // we can't update loader before binding subscriptions
        fetchUserConfig();
    }

    bindEvents(): void {
        if(this.viewRenderer?.uiKit == null) {
            throw new Error("viewService has not been initialized");
        }
        this.calculatorModel.subscribe<CalculateEvents.RESULT_UPDATED>(
            CalculateEvents.RESULT_UPDATED,
            this.viewRenderer.uiKit.result.render
        );
        this.calculatorModel.subscribe<CalculateEvents.ERRORS_UPDATED>(
            CalculateEvents.ERRORS_UPDATED,
            this.viewRenderer.uiKit.errorsList.render
        );
    }

    bindKeyboardListeners(): void {
        if(this.viewRenderer?.uiKit == null) {
            throw new Error("viewService has not been initialized");
        }
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewRenderer.uiKit.inputElement,
            onKeydown: () => {
                if(this.viewRenderer?.uiKit) {
                    this.calculatorModel.onCalculateExpression(this.viewRenderer.uiKit.getExpression());
                }
            }
        });
    }
}
