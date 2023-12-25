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
import {ExpressionCalculatorReturn} from "../shared/types/types";
import {ClientErrors} from "../shared/contstants/clientErrors";

export class ExpressionCalculator implements ExpressionCalculatorInterface {
    private apiService: CalculatorApiService;

    constructor(apiService: Singleton<CalculatorApiService>) {
        this.apiService = apiService.getInstance();
    }

    async calculateExpression(payload: CalculateExpressionPayload): Promise<ExpressionCalculatorReturn> {
        const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return { errors: validationErrors };
        }

        const transformedPayload = this.transformPayload(payload);

        try {
            const result = await this.apiService.calculateExpression(transformedPayload);
            return { result };
        } catch (error: any) {
            if(error?.errors) {
                return {errors: error.errors}
            }
            return {errors: [ClientErrors.UNKNOWN_APP_ERROR]}
        }
    }

    private transformPayload(params: CalculateExpressionPayload): CalculateExpressionPayload {
        return {
            expression: resolveNumberAliases(params.expression, Digits)
        };
    }
}