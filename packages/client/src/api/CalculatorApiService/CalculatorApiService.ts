import {HttpRequestHandler} from "../HttpRequestHandler";
import {
    CalculateExpressionPayload,
    CalculateExpressionApiResponse,
    CalculatorApiService as CalculatorApiServiceInterface
} from "../types";

import {CalculateExpressionReturnType, Endpoints} from "@calculator/common";
import {ClientErrors} from "../../shared/contstants/clientErrors";

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
    async calculateExpression(params: CalculateExpressionPayload): Promise<CalculateExpressionReturnType> {
        try {
            const result = await this.post<CalculateExpressionApiResponse, CalculateExpressionPayload>(
                Endpoints.CALCULATE,
                params
            );
            return result.result;
        } catch (e) {
            return { errors: [ClientErrors.UNKNOWN_SERVER_ERROR] }
        }
    }
}