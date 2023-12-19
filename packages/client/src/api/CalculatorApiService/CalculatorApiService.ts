import {BaseHttpService} from "../BaseHttpService";
import {
    CalculateExpressionParams,
    CalculateExpressionApiResponse,
    CalculatorApiService as CalculatorApiServiceInterface
} from "../types";
import {CalculateExpressionReturnType} from "@calculator/common";

export class CalculatorApiService extends BaseHttpService implements CalculatorApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    async calculateExpression(params: CalculateExpressionParams): Promise<CalculateExpressionReturnType> {
        const result = await this.get<CalculateExpressionApiResponse, CalculateExpressionParams>(
            "/calculate",
            params
        );

        return result.result;
    }
}