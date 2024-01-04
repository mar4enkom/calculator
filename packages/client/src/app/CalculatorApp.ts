import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {ViewRenderer} from "./ViewRenderer";
import CalculatorBoxSpinner from "viewService/helpers/ui/spinner/CalculatorBoxSpinner/CalculatorBoxSpinner";
import {render} from "viewService/utils/render";
import {RenderIds} from "./constants/renderIds";
import {AppEvents, AppVariables} from "./index";

export class CalculatorApp {
    private viewRenderer: ViewRenderer | undefined;
    private events: AppEvents;
    private variables: AppVariables;

    constructor(events: AppEvents, variables: AppVariables) {
        this.events = events;
        this.variables = variables;
        this.onMount();
    }

    onMount() {
        this.variables.userConfigValue.subscribe((config) => {
            if(config) {
                this.viewRenderer = new ViewRenderer(this.events, config);
                this.bindEvents();
                this.bindKeyboardListeners();
                //TODO: move ids to constants
                render(this.viewRenderer.createCalculator(), RenderIds.CALCULATOR_WRAPPER);
            }
        });

        this.variables.userConfigLoading.subscribe((loading) => {
            if(loading) render(CalculatorBoxSpinner, RenderIds.CALCULATOR_WRAPPER);
        });

        // calling event should be after subscriptions because
        // we can't update loader before binding subscriptions
        this.events.onFetchUserConfig.dispatch(undefined);
    }

    bindEvents(): void {
        if(this.viewRenderer?.uiKit == null) {
            throw new Error("viewService has not been initialized");
        }
        this.variables.calculatorValue.subscribe(this.viewRenderer.uiKit.result.render);
        this.variables.calculatorError.subscribe((errors) => {
            if(errors?.errors) this.viewRenderer!.uiKit.errorsList.render(errors.errors);
        });
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
                    this.events.onCalculateExpression.dispatch({
                        expression: this.viewRenderer.uiKit.getExpression()
                    });
                }
            }
        });
    }
}
