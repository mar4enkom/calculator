import {HttpRequestHandler} from "../HttpRequestHandler";
import {
    CalculatorApiService as CalculatorApiServiceInterface, ExpressionCalculationResult, QueryResult
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
        const queryResult = await this.post<
            CalculationSuccessResponse, ServerFailResponse>(Endpoints.CALCULATE, params);
        return this.transformQueryResult(queryResult);
    }

    private transformQueryResult(queryResult: QueryResult<CalculationSuccessResponse, ServerFailResponse>): ExpressionCalculationResult {
        if(queryResult.data != null) return { data: queryResult.data.data, errors: undefined };
        return { data: undefined, errors: queryResult.errors?.errors };
    }
}

export default new CalculatorApiService();