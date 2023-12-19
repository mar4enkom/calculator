import {CalculatorViewService} from "viewService/index";
import {initCalculator} from "mvc/index";

import {CalculatorService, operationsConfig} from "@calculator/common";

import "viewService/styles/variables.css";
import "viewService/styles/bootstrap.min.css";
import "viewService/styles/globals.css";
import "viewService/styles/bootstrap-overrides.css";

const calculationViewService = new CalculatorViewService();

export class DummyCalculationService implements CalculatorService {
    calculate(expr: unknown) {
        return {
            result: "2"
        }
    }
}

initCalculator(new DummyCalculationService(), calculationViewService, operationsConfig);
