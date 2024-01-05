import {App} from "./App";
import {initCalculator} from "../calculator";
import {initUserConfig, userConfigEvents, userConfigVariables} from "../userConfig";
import {AppUiKit} from "./view/ui/AppUiKit";
import {AppViewService} from "./view/AppViewService";
import {DomIds} from "../shared/contstants/dom";
import {initHistory} from "../history";

export function initApp(): void {
    const uiKit = new AppUiKit();
    const viewService = new AppViewService(uiKit);

    try {
        new App({
            initCalculator,
            initUserConfig,
            userConfigVariables,
            userConfigEvents,
            viewService,
            initHistory
        });
    } catch (e) {
        console.error(e);
        document.getElementById(DomIds.ROOT)!.innerHTML = ``;
        viewService.renderCalculatorErrorIndicator(true);
    }
}