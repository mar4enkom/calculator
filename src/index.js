import {CalculateExpressionView} from "./modules/calculator/view/CalculateExpressionView.js";
import {CalculateExpressionController} from "./modules/calculator/controller/CalculateExpressionController.js";
import {CalculateExpressionService} from "./modules/calculator/model/CalculateExpressionService.js";
import {operationsConfig} from "../userConfig/operations/index.js";

import "./styles/bootstrap.min.css";
import "./styles/globals.css";
import "./styles/bootstrap-overrides.css";

function initCalculator() {
    const calculateExpressionModel = new CalculateExpressionService(operationsConfig);
    const calculationController = new CalculateExpressionController(calculateExpressionModel);
    const calculationView = new CalculateExpressionView(calculateExpressionModel, calculationController);
    calculationView.render();
}

initCalculator();