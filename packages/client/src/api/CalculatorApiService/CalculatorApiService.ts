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

class CalculatorApiService extends HttpRequestHandler implements CalculatorApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async calculateExpression(params: CalculateExpressionPayload) {
        return await this.post<
            CalculationSuccessResponse, ServerFailResponse>(Endpoints.CALCULATE, params);
    }
}

export default new CalculatorApiService();