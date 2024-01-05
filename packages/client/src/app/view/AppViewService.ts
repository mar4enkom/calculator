import {DomIds} from "../../shared/contstants/dom";
import {appendElement, removeElement} from "../../calculator/view/utils/appendElement";
import {RenderIds} from "../../shared/contstants/renderIds";
import {AppUiKit} from "./ui/AppUiKit";

export class AppViewService {
    private uiKit: AppUiKit;
    constructor(uiKit: AppUiKit) {
        this.uiKit = uiKit;

        this.renderCalculatorLoader = this.renderCalculatorLoader.bind(this);
        this.renderCalculator = this.renderCalculator.bind(this);
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
            appendElement(this.uiKit.appSpinner, RenderIds.CALCULATOR_LOADER, root);
        } else {
            removeElement(RenderIds.CALCULATOR_LOADER)
        }
    }
}