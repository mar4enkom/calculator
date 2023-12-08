import {initCalculator} from "Mvc/index.js";

import {ExpressionCalculator} from "CalculatorService/index.js";
import {CalculatorViewService} from "ViewService/index.js";

import {operationsConfig} from "UserConfig/index.js";

import "ViewService/styles/variables.css";
import "ViewService/styles/bootstrap.min.css";
import "ViewService/styles/globals.css";
import "ViewService/styles/bootstrap-overrides.css";

const calculationViewService = new CalculatorViewService();
const calculationService = new ExpressionCalculator(operationsConfig);

initCalculator(calculationService, calculationViewService, operationsConfig);
