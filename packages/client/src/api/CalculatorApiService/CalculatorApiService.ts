import {HttpRequestHandler} from "../HttpRequestHandler";
import {
    CalculatorApiService as CalculatorApiServiceInterface
} from "../types";

import {
    CalculateExpressionPayload,
    CalculationSuccessResponse,
    Endpoints,
    ServerFailResponse,
} from "@calculator/common";
import {CalculationResult} from "../../shared/types/types";

export class CalculatorApiService extends HttpRequestHandler implements CalculatorApiServiceInterface {
    private static instance: CalculatorApiServiceInterface;
    constructor(apiBase: string) {
        super(apiBase);
    }
    static getInstance(): CalculatorApiServiceInterface {
        if(!CalculatorApiService.instance) {
            CalculatorApiService.instance = new CalculatorApiService(process.env.API_BASE);
        }
        return CalculatorApiService.instance;
    }
    async calculateExpression(params: CalculateExpressionPayload): Promise<CalculationResult> {
        try {
            const result = await this.post<CalculationSuccessResponse, ServerFailResponse>(
                Endpoints.CALCULATE,
                params
            );
            return result.data;
        } catch (error: unknown) {
            throw error;
        }
    }
}