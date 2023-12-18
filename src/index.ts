
import {CalculatorService} from "calculatorService/index";
import {CalculatorViewService} from "viewService/index";

import {initCalculator} from "mvc/index";
import {operationsConfig} from "userConfig/index";

import "viewService/styles/variables.css";
import "viewService/styles/bootstrap.min.css";
import "viewService/styles/globals.css";
import "viewService/styles/bootstrap-overrides.css";
import {initStore} from "calculatorService/helpers/init/initStore";

const calculationViewService = new CalculatorViewService();
const calculationService = new CalculatorService();

initStore({userConfig: operationsConfig});
initCalculator(calculationService, calculationViewService, operationsConfig);
