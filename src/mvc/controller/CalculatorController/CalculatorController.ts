import {Digits} from "userConfig/constants/constants";
import {initialValidations} from "mvc/controller/utils/initialValidations/initialValidations";
import {getValidationErrors} from "shared/utils/getValidationErrors";
import {resolveNumberAliases} from "mvc/controller/utils/prepareExpression/resolveNumberAliases";
import {CalculatorModel} from "mvc/model/CalculatorModel";
import {IExpressionCalculator} from "shared/types/types";

export class CalculatorController {
    private model: CalculatorModel;
    private calculationService: IExpressionCalculator;
    constructor(model: CalculatorModel, calculationService: IExpressionCalculator) {
        this.model = model;
        this.calculationService = calculationService;

        this.model.subscribe("calculateExpression", this.handleCalculateExpression.bind(this));
    }

    handleCalculateExpression(expression: string): void {
        const validationErrors = getValidationErrors(expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return this.model.setErrors(validationErrors);
        }

        const transformedExpression = this.transformExpression(expression);
        const calculationResult = this.calculationService.calculate(transformedExpression);

        if('errors' in calculationResult) {
            this.model.setErrors(calculationResult.errors);
        } else {
            this.model.setResult(calculationResult.result);
        }
    }

    transformExpression(expression: string): string {
        return resolveNumberAliases(expression, Digits);
    }
}
