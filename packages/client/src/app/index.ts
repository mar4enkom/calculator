import {CalculatorApp} from "./CalculatorApp";
import {onCalculateExpression} from "../calculateExpression/events";

function initCalculator(
) {
    new CalculatorApp({
        onCalculateExpression
    });
}

export {
    initCalculator
}