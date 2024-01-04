import {CalculatorApp} from "./CalculatorApp";
import {ViewRenderer} from "./ViewRenderer";
import {render, hide} from "viewService/utils/render";
import {RenderIds} from "./constants/renderIds";
import CalculatorBoxSpinner from "viewService/helpers/ui/spinner/CalculatorBoxSpinner/CalculatorBoxSpinner";
import {events, variables} from "./observer";
import {DomIds} from "../shared/contstants/dom";

function initCalculator() {
    variables.userConfigValue.subscribe((config) => {
        if(config) {
            const viewRenderer = new ViewRenderer(events, config);
            const app = new CalculatorApp(events, variables, viewRenderer);
            const root = document.getElementById(DomIds.ROOT)!;
            render(app.getAppElement(), RenderIds.CALCULATOR_WRAPPER, root);
        } else {
            hide(RenderIds.CALCULATOR_WRAPPER)
        }
    });

    variables.userConfigLoading.subscribe((loading) => {
        if(loading) {
            const root = document.getElementById(DomIds.ROOT)!;
            render(CalculatorBoxSpinner, RenderIds.CALCULATOR_LOADER, root);
        } else {
            hide(RenderIds.CALCULATOR_LOADER)
        }
    });

    // calling event should be after subscriptions because
    // we can't update loader before subscriptions are bound
    events.onFetchUserConfig.dispatch(undefined);
}

export {
    initCalculator
}