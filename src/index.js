import {CalculateExpressionController} from "Calculator/mvc/controller/index.js";
import {CalculateExpressionModel} from "Calculator/mvc/model/index.js";
import {CalculatorView} from "Calculator/mvc/view/CalculatorView.js";

import {CalculatorViewService} from "./CalculatorViewService/index.js";

import {operationsConfig} from "UserConfig/index.js";

import "./CalculatorViewService/styles/variables.css";
import "./CalculatorViewService/styles/bootstrap.min.css";
import "./CalculatorViewService/styles/globals.css";
import "./CalculatorViewService/styles/bootstrap-overrides.css";
import {ExpressionCalculator} from "./ExpressionCalculator/index.js";

function initCalculator() {
    const calculationViewService = new CalculatorViewService();
    const calculationService = new ExpressionCalculator(operationsConfig);

    const calculateExpressionModel = new CalculateExpressionModel();
    const calculationController = new CalculateExpressionController(calculateExpressionModel, calculationService);
    const calculationView = new CalculatorView(calculationViewService, calculateExpressionModel, operationsConfig);

    calculationView.render();
}

initCalculator();
