import {initCalculator} from "./app";

import {CalculatorViewService} from "./calculatorView";
import {calculatorModel} from "./calculateExpression";

import "./calculatorView/styles/variables.css";
import "./calculatorView/styles/bootstrap.min.css";
import "./calculatorView/styles/globals.css";
import "./calculatorView/styles/bootstrap-overrides.css";
import {TestDigitSymbols, TestSymbols} from "@calculator/common";


const calculationViewService = new CalculatorViewService(TestSymbols, TestDigitSymbols);

initCalculator(calculatorModel,  calculationViewService);
