import "./spinner.css";
import {ClassNames} from "../../../../../shared/contstants/dom";

export class Spinner implements SpinnerInterface {
    create(): HTMLDivElement {
        const spinner = document.createElement("div");
        spinner.classList.add(ClassNames.SPINNER_WRAPPER);
        const spinnerContent = document.createElement("div");
        spinnerContent.classList.add(ClassNames.SPINNER_CONTENT);
        spinner.appendChild(spinnerContent);
        const div = document.createElement("div");
        spinnerContent.appendChild(div);

        return spinner;
    }
}