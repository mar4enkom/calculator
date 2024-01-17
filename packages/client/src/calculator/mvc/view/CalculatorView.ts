import {CalculatorViewCreator} from "@/calculator/calculatorViewCreator/CalculatorViewCreator";
import {bindKeyboardListener} from "@/shared/utils/bindKeyboardListener";
import {calculatorEvents, calculatorVariables} from "@/calculator";

export class CalculatorView {
    private viewCreator: CalculatorViewCreator;

    constructor(viewRenderer: CalculatorViewCreator) {
        this.viewCreator = viewRenderer;

        this.setupVariablesSubscriptions();
        this.bindKeyboardListeners();
    }

    getAppElement(): HTMLElement {
        return this.viewCreator.createCalculatorUI()
    }

    private setupVariablesSubscriptions(): void{
        calculatorVariables.value.subscribe(this.viewCreator.uiKit.result.render);
        calculatorVariables.error.subscribe(
            (errors) => this.viewCreator.uiKit.errorsList.render(errors?.errors)
        );
    }

    private bindKeyboardListeners(): void {
        bindKeyboardListener({
            keyName: "Enter",
            root: this.viewCreator.uiKit.inputElement,
            onKeydown: () => {
                calculatorEvents.onCalculateExpression.dispatch({
                    expression: this.viewCreator.uiKit.getExpression()
                });
            }
        });
    }
}
