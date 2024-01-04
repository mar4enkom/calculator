import {CalculatorApiService} from "../api/types";
import {
    CalculateExpressionPayload, CalculationResult,
    getValidationErrors,
} from "@calculator/common";
import {ExpressionCalculator as ExpressionCalculatorInterface} from "./types";
import {initialValidations} from "./utils/initialValidations/initialValidations";

export class ExpressionCalculator implements ExpressionCalculatorInterface {
    private apiService: CalculatorApiService;

    constructor(apiService: CalculatorApiService) {
        this.apiService = apiService;
    }

    async calculateExpression(payload: CalculateExpressionPayload): Promise<CalculationResult> {
        return await this.apiService.calculateExpression(payload);
    }
}