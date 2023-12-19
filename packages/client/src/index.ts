import {CalculatorViewService} from "viewService/index";
import {initCalculator} from "mvc/index";

import {operationsConfig} from "@calculator/common";

import "viewService/styles/variables.css";
import "viewService/styles/bootstrap.min.css";
import "viewService/styles/globals.css";
import "viewService/styles/bootstrap-overrides.css";
import {CalculatorApiService} from "api/CalculatorApiService/CalculatorApiService";

const calculationViewService = new CalculatorViewService();
const apiService = new CalculatorApiService();

initCalculator(apiService, calculationViewService, operationsConfig);
