import {initCalculator} from "./modules/app";

import {CalculatorViewService} from "./modules/calculatorView";
import {calculatorModel} from "./modules/calculateExpression";

import "./modules/calculatorView/styles/variables.css";
import "./modules/calculatorView/styles/bootstrap.min.css";
import "./modules/calculatorView/styles/globals.css";
import "./modules/calculatorView/styles/bootstrap-overrides.css";
import {TestDigitSymbols, TestSymbols} from "@calculator/common";


const calculationViewService = new CalculatorViewService(TestSymbols, TestDigitSymbols);

initCalculator(calculatorModel,  calculationViewService);
