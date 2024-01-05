import "./spinner.css";
import {ClassNames} from "../../contstants/dom";

export class Spinner implements AppElement {
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