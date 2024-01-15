import {
    CalculateExpressionPayload, CalculationResponseBody,
    CalculationSuccessResponse,
    Endpoints,
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";

export class CalculatorApiService extends HttpRequestHandler {
    async calculateExpression(params: CalculateExpressionPayload): Promise<CalculationResponseBody> {
        const queryResult = await this.post<
            CalculationSuccessResponse>(Endpoints.CALCULATE, params);
        return queryResult.data;
    }
}

export const calculatorApiService = new CalculatorApiService();