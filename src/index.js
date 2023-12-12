import {initCalculator} from "mvc/index.js";

import {ExpressionCalculator} from "calculatorService/index.ts";
import {CalculatorViewService} from "viewService/index.ts";

import {operationsConfig} from "userConfig/index.js";

import "viewService/styles/variables.css";
import "viewService/styles/bootstrap.min.css";
import "viewService/styles/globals.css";
import "viewService/styles/bootstrap-overrides.css";

const calculationViewService = new CalculatorViewService();
const calculationService = new ExpressionCalculator(operationsConfig);

initCalculator(calculationService, calculationViewService, operationsConfig);
