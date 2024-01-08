import {ClassNames, DomIds} from "../../shared/contstants/dom";
import {appendElement, removeElement} from "../../calculator/view/utils/appendElement";
import {RenderIds} from "../../shared/contstants/renderIds";
import {AppUiKit} from "./ui/AppUiKit";

export class AppViewService {
    private uiKit: AppUiKit;
    constructor(uiKit: AppUiKit) {
        this.uiKit = uiKit;

        this.renderCalculatorLoader = this.renderCalculatorLoader.bind(this);
        this.renderCalculator = this.renderCalculator.bind(this);
        this.renderCalculatorErrorIndicator = this.renderCalculatorErrorIndicator.bind(this);
    }

    renderCalculator(calculatorElement: HTMLElement | undefined) {
        if(calculatorElement) {
            const root = document.getElementById(DomIds.ROOT)!;
            appendElement(calculatorElement, RenderIds.CALCULATOR_WRAPPER, root);
        } else {
            removeElement(RenderIds.CALCULATOR_WRAPPER)
        }
    }

    renderCalculatorLoader(loading: boolean) {
        if(loading) {
            const root = document.getElementById(DomIds.ROOT)!;
            appendElement(this.uiKit.loadingIndicator, RenderIds.CALCULATOR_LOADER, root);
        } else {
            removeElement(RenderIds.CALCULATOR_LOADER)
        }
    }

    renderCalculatorErrorIndicator(error: unknown) {
        if(error) {
            const root = document.getElementById(DomIds.ROOT)!;
            appendElement(this.uiKit.errorIndicator, RenderIds.CALCULATOR_ERROR_INDICATOR, root)
        } else {
            removeElement(RenderIds.CALCULATOR_ERROR_INDICATOR)
        }
    }

    renderHistory(historyElement: HTMLElement) {
        if(historyElement) {
            const root = document.getElementById(DomIds.CALCULATOR_TOP_BOX)!;
            const historyBox = document.createElement("div");
            historyBox.classList.add(ClassNames.HISTORY_WRAPPER);
            historyBox.appendChild(historyElement);

            appendElement(historyBox, RenderIds.HISTORY_ELEMENT, root)
        } else {
            removeElement(RenderIds.HISTORY_ELEMENT)
        }
    }
}