import {Config} from "@calculator/common";
import {CalculatorView} from "@/calculator/mvc/view/CalculatorView";
import {CalculatorViewCreator} from "@/calculator/calculatorViewCreator/CalculatorViewCreator";
import {calculatorEvents} from "@/calculator/mvc/model/events";
import {CalculatorController} from "@/calculator/mvc/controller/CalculatorController";
import {calculatorVariables} from "@/calculator/mvc/model/variables";
import {Calculator} from "@/calculator/calculator/Calculator";
import {historyEvents} from "@/history/mvc/model/events";
import {calculatorApiService} from "@/calculator/api/CalculatorApiService/CalculatorApiService";

export function initCalculator(config: Config): CalculatorView {
    const calculator = new Calculator(calculatorApiService, historyEvents);
    const viewCreator = new CalculatorViewCreator(calculatorEvents, config);
    const controller =
        new CalculatorController(calculatorVariables, calculatorEvents, calculator);
    controller.setupEventsSubscriptions();

    return new CalculatorView(calculatorEvents, calculatorVariables, viewCreator);
}