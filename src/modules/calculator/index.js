import {CalculateExpressionController} from "./controller/index.js";
import {CalculatorView} from "./view/index.js";
import {CalculateExpressionModel} from "./model/CalculateExpressionModel.js";

import {operationsConfig} from "@userConfig/index.js";

import "./view/styles/variables.css";
import "./view/styles/bootstrap.min.css";
import "./view/styles/globals.css";
import "./view/styles/bootstrap-overrides.css";

export function initCalculator() {
    const calculateExpressionModel = new CalculateExpressionModel();
    const calculationController = new CalculateExpressionController(calculateExpressionModel, operationsConfig);
    const calculationView = new CalculatorView(calculateExpressionModel, operationsConfig);

    calculationView.render();
}
