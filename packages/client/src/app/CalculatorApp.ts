import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {ViewRenderer} from "./ViewRenderer";
import CalculatorBoxSpinner from "viewService/helpers/ui/spinner/CalculatorBoxSpinner/CalculatorBoxSpinner";
import {render} from "viewService/utils/render";
import {RenderIds} from "./constants/renderIds";
import {userConfigLoadingVar, userConfigValueVar} from "../userConfig";
import {AppEvent} from "../shared/createEvent/AppEvent";
import {CalculateExpressionPayload} from "@calculator/common";
import {calculatorErrorVar, calculatorValueVar} from "../calculateExpression";
import {onFetchUserConfig} from "../userConfig/events";

export interface AppEvents {
    onCalculateExpression: AppEvent<CalculateExpressionPayload>;
}

export class CalculatorApp {
    private viewRenderer: ViewRenderer | undefined;
    private events: AppEvents;

    constructor(events: AppEvents) {
        this.events = events;
        this.onMount();
    }

    onMount() {
        userConfigValueVar.subscribe((config) => {
            if(config) {
                this.viewRenderer = new ViewRenderer(this.events, config);
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
        onFetchUserConfig.dispatch(undefined);
    }

    bindEvents(): void {
        if(this.viewRenderer?.uiKit == null) {
            throw new Error("viewService has not been initialized");
        }
        calculatorValueVar.subscribe(this.viewRenderer.uiKit.result.render);
        // TODO: remove any
        calculatorErrorVar.subscribe((errors) => {
            this.viewRenderer!.uiKit.errorsList.render(errors?.errors);
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
