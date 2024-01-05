import CalculatorBoxSpinner from "./CalculatorBoxSpinner/CalculatorBoxSpinner";

export class AppUiKit {
    public appSpinner: typeof CalculatorBoxSpinner;
    constructor() {
        this.appSpinner = CalculatorBoxSpinner;
    }
}