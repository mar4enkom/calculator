import {CalculatorApiService} from "api/types";
import {
    CalculateExpressionPayload,
    Digits,
    getValidationErrors,
    Singleton,
} from "@calculator/common";
import {ExpressionCalculator as ExpressionCalculatorInterface} from "./types";
import {resolveNumberAliases} from "./utils/prepareExpression/resolveNumberAliases";
import {initialValidations} from "./utils/initialValidations/initialValidations";
import {ExpressionCalculationResult} from "../shared/types/types";

export class ExpressionCalculator implements ExpressionCalculatorInterface {
    private apiService: CalculatorApiService;

    constructor(apiService: Singleton<CalculatorApiService>) {
        this.apiService = apiService.getInstance();
    }

    async calculateExpression(payload: CalculateExpressionPayload): Promise<ExpressionCalculationResult> {
        const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return { data: undefined, errors: validationErrors };
        }

        const transformedPayload = this.transformPayload(payload);

        const result = await this.apiService.calculateExpression(transformedPayload);
        return {
            data: result.data?.data,
            errors: result.errors?.errors
        };
    }

    private transformPayload(params: CalculateExpressionPayload): CalculateExpressionPayload {
        return {
            expression: resolveNumberAliases(params.expression, Digits)
        };
    }
}