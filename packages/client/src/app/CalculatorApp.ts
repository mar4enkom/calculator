import {bindKeyboardListener} from "./utils/bindKeyboardListener";
import {ViewRenderer} from "./ViewRenderer";
import {render} from "viewService/utils/render";
import {RenderIds} from "./constants/renderIds";
import {AppEvents, AppVariables} from "./observer";

export class CalculatorApp {
    private viewRenderer: ViewRenderer;
    private events: AppEvents;
    private variables: AppVariables;

    constructor(events: AppEvents, variables: AppVariables, viewRenderer: ViewRenderer) {
        this.events = events;
        this.variables = variables;
        this.viewRenderer = viewRenderer;

        render(this.viewRenderer.createCalculator(), RenderIds.CALCULATOR_WRAPPER);
    }

    bindEvents(): void {
        this.variables.calculatorValue.subscribe(this.viewRenderer.uiKit.result.render);
        this.variables.calculatorError.subscribe((errors) => {
            if(errors?.errors) this.viewRenderer!.uiKit.errorsList.render(errors.errors);
        });
    }

    bindKeyboardListeners(): void {
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
