import {CalculateExpressionView} from "./modules/calculator/view/CalculateExpressionView.js";
import {CalculateExpressionController} from "./modules/calculator/controller/CalculateExpressionController.js";
import {CalculateExpressionService} from "./modules/calculator/model/CalculateExpressionService.js";
import {operationsConfig} from "./config/operations/index.js";

function initCalculator() {
    const calculateExpressionModel = new CalculateExpressionService(operationsConfig);
    const calculationView = new CalculateExpressionView(calculateExpressionModel);
    const calculationController = new CalculateExpressionController(calculateExpressionModel);

    return calculationController;
}

const calculator = initCalculator();

calculator.handleCalculateExpression("(sqrt(2) * sin(45°) + 4/2 - sqrt(9)/3) * (10/2 + sqrt(16/4) - sin(30°)/2)");

//console.log(c.calculate("-sqrt(4)*10"))
// console.log(c.calculate("(sqrt(2) * sin(45°) + 4/2 - sqrt(9)/3) * (10/2 + sqrt(16/4) - sin(30°)/2)"))
// //13.5
// console.log(c.calculate("(sqrt(4) + ((15 - 5 * sin(30°)) - 2) * (3 + 1)) + ((2 + 2) * 2)"))
// //52
// console.log(c.calculate("-4*(0.25+0.75)"))