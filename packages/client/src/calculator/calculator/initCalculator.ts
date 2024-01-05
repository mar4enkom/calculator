import {CalculatorController} from "../controller/CalculatorController";
import {calculatorVariables} from "../observer/variables";
import CalculatorApiService from "../api/CalculatorApiService/CalculatorApiService";
import {calculatorEvents} from "../observer/events";
import {Calculator} from "./Calculator";
import {UserConfigResponseBody} from "@calculator/common";
import {ViewRenderer} from "../view/ViewRenderer";

export function initCalculator(userConfig: UserConfigResponseBody): Calculator {
    const viewRenderer = new ViewRenderer(calculatorEvents, userConfig);
    const controller =
        new CalculatorController(calculatorVariables, CalculatorApiService);

    return new Calculator(calculatorEvents, calculatorVariables, viewRenderer, controller);
}