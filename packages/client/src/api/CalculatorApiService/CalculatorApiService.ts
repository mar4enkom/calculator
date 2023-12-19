import {BaseHttpService} from "../BaseHttpService";
import {
    CalculateExpressionParams,
    CalculateExpressionApiResponse,
    CalculatorApiService as CalculatorApiServiceInterface
} from "../types";
import {CalculateExpressionReturnType, Endpoints} from "@calculator/common";

export class CalculatorApiService extends BaseHttpService implements CalculatorApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async calculateExpression(params: CalculateExpressionParams): Promise<CalculateExpressionReturnType> {
        const result = await this.get<CalculateExpressionApiResponse, CalculateExpressionParams>(
            Endpoints.CALCULATE,
            params
        );

        return result.result;
    }
}