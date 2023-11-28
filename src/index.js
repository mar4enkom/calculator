import {CalculateExpressionController} from "./modules/calculator/controller/index.js";
import {CalculateExpressionView} from "./modules/calculator/view/index.js";
import {CalculateExpressionModel} from "./modules/calculator/model/CalculateExpressionModel.js";

import {operationsConfig} from "UserConfig/index.js";

import "./styles/variables.css";
import "./styles/bootstrap.min.css";
import "./styles/globals.css";
import "./styles/bootstrap-overrides.css";

function initCalculator() {
    const calculateExpressionModel = new CalculateExpressionModel();
    const calculationController = new CalculateExpressionController(calculateExpressionModel, operationsConfig);
    const calculationView = new CalculateExpressionView(calculateExpressionModel, operationsConfig);

    calculationView.render();
}

initCalculator();