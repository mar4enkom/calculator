import {CalculatorController} from "./mvc/controller/CalculatorController";
import {calculatorVariables} from "./mvc/model/variables";
import CalculatorApiService from "./api/CalculatorApiService/CalculatorApiService";
import {calculatorEvents} from "./mvc/model/events";
import {CalculatorView} from "./mvc/view/CalculatorView";
import {UserConfigResponseBody} from "@calculator/common";
import {CalculatorViewCreator} from "./calculatorViewCreator/CalculatorViewCreator";

export function initCalculator(userConfig: UserConfigResponseBody): CalculatorView {
    const viewCreator = new CalculatorViewCreator(calculatorEvents, userConfig);
    const controller =
        new CalculatorController(calculatorVariables, calculatorEvents, CalculatorApiService);
    controller.setupEventsSubscriptions();

    return new CalculatorView(calculatorEvents, calculatorVariables, viewCreator);
}