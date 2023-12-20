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
        const calculationResult = await this.apiService.calculateExpression(params);
        return calculationResult;
    }
}