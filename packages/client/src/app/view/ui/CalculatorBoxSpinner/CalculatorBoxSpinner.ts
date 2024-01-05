import {Spinner} from "../../../../shared/ui/spinner/Spinner/Spinner";

import "./calculatorBoxSpinner.css";
import {ClassNames} from "../../../../shared/contstants/dom";

class CalculatorBoxSpinner extends Spinner implements SpinnerInterface{
    create(): HTMLDivElement {
        const spinner = super.create();
        const spinnerWrapper = document.createElement("div");
        spinnerWrapper.classList.add(ClassNames.CALCULATOR_SPINNER_WRAPPER)
        spinnerWrapper.appendChild(spinner);

        return spinnerWrapper;
    }
}

export default (new CalculatorBoxSpinner()).create();