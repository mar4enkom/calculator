import {HttpRequestService} from "../HttpRequestService";
import {
    CalculateExpressionParams,
    CalculateExpressionApiResponse,
    CalculatorApiService as CalculatorApiServiceInterface
} from "../types";

import {CalculateExpressionReturnType, Endpoints} from "@calculator/common";

export class CalculatorApiService implements CalculatorApiServiceInterface {
    private static instance: CalculatorApiServiceInterface;
    constructor() { }
    static getInstance(): CalculatorApiServiceInterface {
        if(!CalculatorApiService.instance) {
            CalculatorApiService.instance = new CalculatorApiService();
        }
        return CalculatorApiService.instance;
    }
    async calculateExpression(params: CalculateExpressionParams): Promise<CalculateExpressionReturnType> {
        try {
            const result = await HttpRequestService.get<CalculateExpressionApiResponse, CalculateExpressionParams>(
                Endpoints.CALCULATE,
                params
            );
            return result.result;
        } catch (e) {
            return {
                errors: [{code: "UNKNOWN_SERVER_ERROR", message: "Unknown server error"}]
            }
        }
    }
}