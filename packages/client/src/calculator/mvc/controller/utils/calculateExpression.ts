import {
    CalculateExpressionPayload,
    CalculationResponseBody,
    CalculationSuccessResponse,
    Endpoints
} from "@calculator/common";
import {historyVariables} from "@/history/mvc/model/variables";
import {apiRoutes} from "@/shared/apiRouter/apiRoutes";

export async function calculateExpression(payload: CalculateExpressionPayload): Promise<CalculationResponseBody> {
    const lastHistoryElement = historyVariables.value.getValue()?.[0];
    if(lastHistoryElement != null && payload.expression === lastHistoryElement.expression) {
        return {
            calculationResult: lastHistoryElement.expressionResult,
        }
    }

    const response = await apiRoutes[Endpoints.CALCULATE].post.fetch<CalculationSuccessResponse>(payload);
    return response.data;
}