import "./spinner.css";
import {AppElement} from "@/shared/ui/types";
import {ClassNames} from "@/shared/contstants/dom";

class Spinner implements AppElement {
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

export default (new Spinner()).create();