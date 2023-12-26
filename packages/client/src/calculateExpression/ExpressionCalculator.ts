import {CalculatorApiService} from "api/types";
import {
    CalculateExpressionPayload,
    Digits,
    getValidationErrors,
    Singleton,
} from "@calculator/common";
import {ExpressionCalculationResult, ExpressionCalculator as ExpressionCalculatorInterface} from "./types";
import {resolveNumberAliases} from "./utils/prepareExpression/resolveNumberAliases";
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

        const transformedPayload = this.transformPayload(payload);

        const result = await this.apiService.calculateExpression(transformedPayload);

        if(result.data != null) return { data: result.data?.data, errors: undefined };
        return { data: undefined, errors: result.errors?.errors };
    }

    private transformPayload(params: CalculateExpressionPayload): CalculateExpressionPayload {
        return {
            expression: resolveNumberAliases(params.expression, Digits)
        };
    }
}