import {
    CalculateExpressionPayload,
    CalculationSuccessResponse,
    Endpoints,
} from "@calculator/common";
import {HttpRequestHandler} from "@/shared/helpers/api/HttpRequestHandler";
import {CalculatorApiService as CalculatorApiServiceInterface} from "@/calculator/api/types";

class CalculatorApiService extends HttpRequestHandler implements CalculatorApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async calculateExpression(params: CalculateExpressionPayload) {
        const queryResult = await this.post<
            CalculationSuccessResponse>(Endpoints.CALCULATE, params);
        return queryResult.data;
    }
}

export default new CalculatorApiService();