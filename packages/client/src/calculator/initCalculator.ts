import {Config} from "@calculator/common";
import {CalculatorView} from "@/calculator/mvc/view/CalculatorView";
import {CalculatorViewCreator} from "@/calculator/calculatorViewCreator/CalculatorViewCreator";
import {calculatorEvents} from "@/calculator/mvc/model/events";
import {CalculatorController} from "@/calculator/mvc/controller/CalculatorController";
import {calculatorVariables} from "@/calculator/mvc/model/variables";

export function initCalculator(config: Config): CalculatorView {
    const viewCreator = new CalculatorViewCreator(calculatorEvents, config);
    const controller =
        new CalculatorController(calculatorVariables, calculatorEvents);
    controller.setupEventsSubscriptions();

    return new CalculatorView(calculatorEvents, calculatorVariables, viewCreator);
}