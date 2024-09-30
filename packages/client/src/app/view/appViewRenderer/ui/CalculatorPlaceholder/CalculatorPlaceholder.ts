import {assert} from "@calculator/common";
import {AppElement, CreateElementArgs} from "@/shared/ui/types";
import {ClassNames} from "@/shared/contstants/dom";
import "./calculatorPlaceholder.css";

type CalculatorPlaceholderTheme = "primary" | "danger";

export class CalculatorPlaceholder implements AppElement {
    private theme: CalculatorPlaceholderTheme;
    constructor(theme: CalculatorPlaceholderTheme = "primary") {
        this.theme = theme
    }
    create({innerContent}: CreateElementArgs) {
        const wrapper = document.createElement("div");
        wrapper.classList.add(ClassNames.CALCULATOR_PLACEHOLDER_WRAPPER);

        const themeClassName = this.getWrapperClassName(this.theme);
        wrapper.classList.add(themeClassName);

        if(innerContent) {
            wrapper.appendChild(innerContent);
        }

        return wrapper;
    }

    private getWrapperClassName(theme: CalculatorPlaceholderTheme): ClassNames {
        let result;
        switch (theme) {
            case "danger":
                result = ClassNames.CALCULATOR_PLACEHOLDER_DANGER;
                break;
            case "primary":
                result = ClassNames.CALCULATOR_PLACEHOLDER_PRIMARY;
                break;
            default:
                assert(theme);
        }
        return result;
    }
}
