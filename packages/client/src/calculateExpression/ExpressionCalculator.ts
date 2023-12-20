import {CalculatorApiService} from "api/CalculatorApiService/CalculatorApiService";
import {CalculateExpressionPayload} from "api/types";
import {CalculateExpressionReturnType, Digits, getValidationErrors, Singleton} from "@calculator/common";
import {ExpressionCalculator as ExpressionCalculatorInterface} from "./types";
import {resolveNumberAliases} from "./utils/prepareExpression/resolveNumberAliases";
import {initialValidations} from "./utils/initialValidations/initialValidations";

export class ExpressionCalculator implements ExpressionCalculatorInterface {
    private apiService: CalculatorApiService;

    constructor(apiService: Singleton<CalculatorApiService>) {
        this.apiService = apiService.getInstance();
    }

    async calculateExpression(payload: CalculateExpressionPayload): Promise<CalculateExpressionReturnType> {
        const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
        if(validationErrors?.length > 0) {
            return { errors: validationErrors };
        }

        const transformedPayload = this.transformPayload(payload);

        return await this.apiService.calculateExpression(transformedPayload);
    }

    private transformPayload(params: CalculateExpressionPayload): CalculateExpressionPayload {
        return {
            expression: resolveNumberAliases(params.expression, Digits)
        };
    }
}