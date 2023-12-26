import {CalculatorViewService} from "viewService/index";
import {initCalculator} from "mvc/index";

import {ExpressionCalculator} from "./calculateExpression/ExpressionCalculator";
import CalculatorApiService from "api/CalculatorApiService/CalculatorApiService";

import {operationsConfig} from "@calculator/common";

import "viewService/styles/variables.css";
import "viewService/styles/bootstrap.min.css";
import "viewService/styles/globals.css";
import "viewService/styles/bootstrap-overrides.css";

const calculationViewService = new CalculatorViewService();
const expressionCalculator = new ExpressionCalculator(CalculatorApiService);

initCalculator(expressionCalculator, calculationViewService, operationsConfig);
