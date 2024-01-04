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

        this.bindEvents();
        this.bindKeyboardListeners();
    }

    getAppElement(): HTMLElement {
        return this.viewRenderer.createCalculator()
    }

    private bindEvents(): void {
        this.variables.calculatorValue.subscribe(this.viewRenderer.uiKit.result.render);
        this.variables.calculatorError.subscribe((errors) => {
            if(errors?.errors) this.viewRenderer!.uiKit.errorsList.render(errors.errors);
        });
    }

    private bindKeyboardListeners(): void {
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewRenderer.uiKit.inputElement,
            onKeydown: () => {
                this.events.onCalculateExpression.dispatch({
                    expression: this.viewRenderer.uiKit.getExpression()
                });
            }
        });
    }
}
