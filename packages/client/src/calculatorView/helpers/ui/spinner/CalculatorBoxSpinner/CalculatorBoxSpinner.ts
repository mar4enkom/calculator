import {Spinner} from "viewService/helpers/ui/spinner/Spinner/Spinner";

import "./calculatorBoxSpinner.css";

class CalculatorBoxSpinner extends Spinner implements SpinnerInterface{
    create(): HTMLDivElement {
        const spinner = super.create();
        const spinnerWrapper = document.createElement("div");
        spinnerWrapper.classList.add("calculator-spinner-wrapper")
        spinnerWrapper.appendChild(spinner);

        return spinnerWrapper;
    }
}

export default (new CalculatorBoxSpinner()).create();