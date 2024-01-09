import {CalculatorViewCreator} from "@/calculator/calculatorViewCreator/CalculatorViewCreator";
import {CalculatorEvents, CalculatorVariables} from "@/calculator";
import {bindKeyboardListener} from "@/shared/utils/bindKeyboardListener";

export class CalculatorView {
    private viewCreator: CalculatorViewCreator;
    private calculatorEvents: CalculatorEvents;
    private calculatorVariables: CalculatorVariables;

    constructor(events: CalculatorEvents, variables: CalculatorVariables, viewRenderer: CalculatorViewCreator) {
        this.calculatorEvents = events;
        this.calculatorVariables = variables;
        this.viewCreator = viewRenderer;

        this.setupVariablesSubscriptions();

        this.bindKeyboardListeners();
    }

    getAppElement(): HTMLElement {
        return this.viewCreator.createCalculatorUI()
    }

    private setupVariablesSubscriptions(): void{
        this.calculatorVariables.value.subscribe(this.viewCreator.uiKit.result.render);
        this.calculatorVariables.error.subscribe(
            (errors) => this.viewCreator.uiKit.errorsList.render(errors?.errors)
        );
    }

    private bindKeyboardListeners(): void {
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewCreator.uiKit.inputElement,
            onKeydown: () => {
                this.calculatorEvents.onCalculateExpression.dispatch({
                    expression: this.viewCreator.uiKit.getExpression()
                });
            }
        });
    }
}
