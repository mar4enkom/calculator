import {CalculatorApp} from "./CalculatorApp";
import {ViewRenderer} from "./ViewRenderer";
import {render} from "viewService/utils/render";
import {RenderIds} from "./constants/renderIds";
import CalculatorBoxSpinner from "viewService/helpers/ui/spinner/CalculatorBoxSpinner/CalculatorBoxSpinner";
import {events, variables} from "./observer";

function initCalculator() {
    variables.userConfigValue.subscribe((config) => {
        if(config) {
            const viewRenderer = new ViewRenderer(events, config);
            new CalculatorApp(events, variables, viewRenderer);
        }
    });

    variables.userConfigLoading.subscribe((loading) => {
        if(loading) render(CalculatorBoxSpinner, RenderIds.CALCULATOR_WRAPPER);
    });

    // calling event should be after subscriptions because
    // we can't update loader before binding subscriptions
    events.onFetchUserConfig.dispatch(undefined);
}

export {
    initCalculator
}