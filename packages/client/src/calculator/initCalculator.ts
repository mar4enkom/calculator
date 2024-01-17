import {Config} from "@calculator/common";
import {CalculatorView} from "@/calculator/mvc/view/CalculatorView";
import {CalculatorViewCreator} from "@/calculator/calculatorViewCreator/CalculatorViewCreator";
import {calculatorController} from "@/calculator/mvc/controller/CalculatorController";

export function initCalculator(config: Config): CalculatorView {
    const viewCreator = new CalculatorViewCreator(config);
    calculatorController.setupEventsSubscriptions();

    return new CalculatorView(viewCreator);
}