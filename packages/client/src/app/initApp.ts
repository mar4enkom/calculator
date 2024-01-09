import {AppUiKit} from "@/app/view/appViewRenderer/ui/AppUiKit";
import {AppViewRenderer} from "@/app/view/appViewRenderer/AppViewRenderer";
import {AppView} from "@/app/view/AppView";
import {initCalculator} from "@/calculator";
import {initUserConfig, userConfigEvents, userConfigVariables} from "@/userConfig";
import {initHistory} from "@/history";
import {DomIds} from "@/shared/contstants/dom";


export function initApp(): void {
    const uiKit = new AppUiKit();
    const viewRenderer = new AppViewRenderer(uiKit);

    try {
        new AppView({
            initCalculator,
            initUserConfig,
            userConfigVariables,
            userConfigEvents,
            viewService: viewRenderer,
            initHistory
        });
    } catch (e) {
        console.error(e);
        document.getElementById(DomIds.ROOT)!.innerHTML = ``;
        viewRenderer.renderCalculatorErrorIndicator(true);
    }
}