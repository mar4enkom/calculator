import {AppUiKit} from "@/app/view/appViewRenderer/ui/AppUiKit";
import {AppViewRenderer} from "@/app/view/appViewRenderer/AppViewRenderer";
import {AppView} from "@/app/view/AppView";
import {initCalculator} from "@/calculator";
import {initHistory} from "@/history";
import {DomIds} from "@/shared/contstants/dom";
import {configEvents, configVariables, initConfig} from "@/config";


export function initApp(): void {
    const uiKit = new AppUiKit();
    const viewRenderer = new AppViewRenderer(uiKit);

    try {
        new AppView({
            initCalculator,
            initConfig: initConfig,
            viewService: viewRenderer,
            initHistory
        });
    } catch (e) {
        console.error(e);
        document.getElementById(DomIds.ROOT)!.innerHTML = ``;
        viewRenderer.renderCalculatorErrorIndicator(true);
    }
}