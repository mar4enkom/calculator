import {CalculatorApiService} from "api/CalculatorApiService/CalculatorApiService";
import {CalculateExpressionParams} from "api/types";
import {CalculateExpressionReturnType, Singleton} from "@calculator/common";
import {ExpressionCalculator as ExpressionCalculatorInterface} from "./types";

export class ExpressionCalculator implements ExpressionCalculatorInterface {
    private apiService: CalculatorApiService;

    constructor(apiService: Singleton<CalculatorApiService>) {
        this.apiService = apiService.getInstance();
    }

    async calculateExpression(params: CalculateExpressionParams): Promise<CalculateExpressionReturnType> {
        try {
            const calculationResult = await this.apiService.calculateExpression(params);
            return calculationResult;
        } catch (e) {
            return {
                errors: [{code: "UNKNOWN_SERVER_ERROR", message: "Unknown server error"}]
            }
        }
    }
}