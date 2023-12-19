import {initialValidations} from "mvc/controller/utils/initialValidations/initialValidations";
import {Digits, getValidationErrors} from "@calculator/common";
import {resolveNumberAliases} from "mvc/controller/utils/prepareExpression/resolveNumberAliases";
import {CalculatorModel} from "mvc/model/CalculatorModel";

import {Events} from "mvc/events";
import {CalculatorApiService} from "api/types";

export class CalculatorController {
    private model: CalculatorModel;
    private calculationApiService: CalculatorApiService;
    constructor(model: CalculatorModel, calculationService: CalculatorApiService) {
        this.model = model;
        this.calculationApiService = calculationService;

        this.model.subscribe(Events.CALCULATE_EXPRESSION, this.handleCalculateExpression.bind(this));
    }

    async handleCalculateExpression(expression: string): Promise<void> {
        const validationErrors = getValidationErrors(expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return this.model.setErrors(validationErrors);
        }

        const transformedExpression = this.transformExpression(expression);
        const calculationResult = await this.calculationApiService.calculateExpression({
            expression: transformedExpression
        });

        console.log(calculationResult);

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
