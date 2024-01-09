import {UserConfigResponseBody} from "@calculator/common";
import {CalculatorView} from "@/calculator/mvc/view/CalculatorView";
import {CalculatorViewCreator} from "@/calculator/calculatorViewCreator/CalculatorViewCreator";
import {calculatorEvents} from "@/calculator/mvc/model/events";
import {CalculatorController} from "@/calculator/mvc/controller/CalculatorController";
import {calculatorVariables} from "@/calculator/mvc/model/variables";
import CalculatorApiService from "@/calculator/api/CalculatorApiService/CalculatorApiService";


export function initCalculator(userConfig: UserConfigResponseBody): CalculatorView {
    const viewCreator = new CalculatorViewCreator(calculatorEvents, userConfig);
    const controller =
        new CalculatorController(calculatorVariables, calculatorEvents, CalculatorApiService);
    controller.setupEventsSubscriptions();

    return new CalculatorView(calculatorEvents, calculatorVariables, viewCreator);
}