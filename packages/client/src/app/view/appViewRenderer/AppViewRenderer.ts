import {AppUiKit} from "@/app/view/appViewRenderer/ui/AppUiKit";
import {ClassNames, DomIds} from "@/shared/contstants/dom";
import {render} from "@/shared/utils/viewUtils/appendElement";
import {RenderIds} from "@/shared/contstants/renderIds";

export class AppViewRenderer {
    private uiKit: AppUiKit;
    constructor(uiKit: AppUiKit) {
        this.uiKit = uiKit;

        this.renderCalculatorLoader = this.renderCalculatorLoader.bind(this);
        this.renderCalculator = this.renderCalculator.bind(this);
        this.renderCalculatorErrorIndicator = this.renderCalculatorErrorIndicator.bind(this);
    }

    renderCalculator(calculatorElement: HTMLElement | undefined) {
        const root = document.getElementById(DomIds.ROOT)!;
        render(
            RenderIds.CALCULATOR_WRAPPER,
            root,
            () => calculatorElement!
        )(calculatorElement != null);
    }

    renderCalculatorLoader(loading: boolean) {
        const root = document.getElementById(DomIds.ROOT)!;
        render(
            RenderIds.CALCULATOR_LOADER,
            root,
            () => this.uiKit.loadingIndicator
        )(loading);
    }

    renderCalculatorErrorIndicator(error: unknown) {
        const root = document.getElementById(DomIds.ROOT)!;

        render(
            RenderIds.CALCULATOR_ERROR_INDICATOR,
            root,
            () => this.uiKit.errorIndicator
        )(error != null);
    }

    renderHistory(historyElement: HTMLElement) {
        const root = document.getElementById(DomIds.CALCULATOR_TOP_BOX)!;

        render(RenderIds.HISTORY_ELEMENT, root, () => {
            const historyBox = document.createElement("div");
            historyBox.classList.add(ClassNames.HISTORY_WRAPPER);
            historyBox.appendChild(historyElement);
            return historyBox;
        })(historyElement != null);
    }
}