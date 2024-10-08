import errorIconSource from "./errorIcon.png";
import "./errorIndicator.css";
import {ClassNames} from "@/shared/contstants/dom";
import {AppElement} from "@/shared/ui/types";

class ErrorIndicator implements AppElement {
    create() {
        const wrapper = document.createElement("div");
        wrapper.classList.add(ClassNames.ERROR_INDICATOR_WRAPPER);

        const imageBox = document.createElement("div");
        imageBox.classList.add(ClassNames.ERROR_INDICATOR_IMAGE_WRAPPER);
        imageBox.innerHTML = `
            <img src=${errorIconSource} alt="Error indicator image" />
        `;
        wrapper.appendChild(imageBox);

        const errorTextContent = document.createElement("div");
        errorTextContent.classList.add(ClassNames.ERROR_INDICATOR_TEXT_WRAPPER)
        errorTextContent.innerHTML = `
            <h4>Something has gone wrong...</h4>
            <p>Try to reload the page</p>
        `;
        wrapper.appendChild(errorTextContent);

        return wrapper;
    }
}

export default (new ErrorIndicator()).create();