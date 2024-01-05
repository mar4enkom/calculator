import {App} from "./App";
import {initCalculator} from "../calculator";
import {initUserConfig, userConfigEvents, userConfigVariables} from "../userConfig";
import {AppUiKit} from "./view/ui/AppUiKit";
import {AppViewService} from "./view/AppViewService";

export function initApp(): void {
    const uiKit = new AppUiKit();
    const viewService = new AppViewService(uiKit);

    new App({
        initCalculator,
        initUserConfig,
        userConfigVariables,
        userConfigEvents,
        viewService
    });
}