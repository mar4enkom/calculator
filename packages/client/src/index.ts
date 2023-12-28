import {initCalculator} from "./app";

import {CalculatorViewService} from "./calculatorView";
import {calculatorModel} from "./calculateExpression";

import "./calculatorView/styles/variables.css";
import "./calculatorView/styles/bootstrap.min.css";
import "./calculatorView/styles/globals.css";
import "./calculatorView/styles/bootstrap-overrides.css";
import {userConfigModel} from "./userConfig";


initCalculator(calculatorModel,  CalculatorViewService, userConfigModel);
