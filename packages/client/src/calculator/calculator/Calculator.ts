import {bindKeyboardListener} from "../../shared/utils/bindKeyboardListener";
import {ViewRenderer} from "../view/ViewRenderer";
import {CalculatorEvents, CalculatorVariables} from "../index";
import {CalculatorController} from "../controller/CalculatorController";

export class Calculator {
    private viewRenderer: ViewRenderer;
    private calculatorEvents: CalculatorEvents;
    private calculatorVariables: CalculatorVariables;

    constructor(events: CalculatorEvents, variables: CalculatorVariables, viewRenderer: ViewRenderer) {
        this.calculatorEvents = events;
        this.calculatorVariables = variables;
        this.viewRenderer = viewRenderer;

        this.setupVariablesSubscriptions();

        this.bindKeyboardListeners();
    }

    getAppElement(): HTMLElement {
        return this.viewRenderer.createCalculatorUI()
    }

    private setupVariablesSubscriptions(): void{
        this.calculatorVariables.value.subscribe(this.viewRenderer.uiKit.result.render);
        this.calculatorVariables.error.subscribe(
            (errors) => this.viewRenderer.uiKit.errorsList.render(errors?.errors)
        );
    }

    private bindKeyboardListeners(): void {
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewRenderer.uiKit.inputElement,
            onKeydown: () => {
                this.calculatorEvents.onCalculateExpression.dispatch({
                    expression: this.viewRenderer.uiKit.getExpression()
                });
            }
        });
    }
}
