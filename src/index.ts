import {initCalculator} from "src/mvc/index";

import {ExpressionCalculator} from "calculatorService/index";
import {CalculatorViewService} from "viewService/index";

import {operationsConfig} from "userConfig/index";

import "viewService/styles/variables.css";
import "viewService/styles/bootstrap.min.css";
import "viewService/styles/globals.css";
import "viewService/styles/bootstrap-overrides.css";

const calculationViewService = new CalculatorViewService();
const calculationService = new ExpressionCalculator(operationsConfig);

initCalculator(calculationService, calculationViewService, operationsConfig);
