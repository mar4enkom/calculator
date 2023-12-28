import {CalculatorApiService, ExpressionCalculationResult} from "../api/types";
import {
    CalculateExpressionPayload,
    getValidationErrors,
} from "@calculator/common";
import {ExpressionCalculator as ExpressionCalculatorInterface} from "./types";
import {initialValidations} from "./utils/initialValidations/initialValidations";

export class ExpressionCalculator implements ExpressionCalculatorInterface {
    private apiService: CalculatorApiService;

    constructor(apiService: CalculatorApiService) {
        this.apiService = apiService;
    }

    async calculateExpression(payload: CalculateExpressionPayload): Promise<ExpressionCalculationResult> {
        const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return { data: undefined, errors: validationErrors };
        }

        return await this.apiService.calculateExpression(payload);
    }
}