import {ClassNames} from "../../contstants/dom";
import errorIcon from "./errorIcon.png";

export class ErrorIndicator implements AppElement {
    create() {
        const wrapper = document.createElement("div");
        wrapper.classList.add(ClassNames.ERROR_INDICATOR_WRAPPER);
        const icon = document.createElement("img");
        icon.src = errorIcon;
        wrapper.appendChild(icon);

        return wrapper;
    }
}