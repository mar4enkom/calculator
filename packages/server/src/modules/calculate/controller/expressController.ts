import {CalculateExpressionPayload, CalculationResponseBody, Endpoints} from "@calculator/common";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {createExpressAction} from "@/shared/helpers/controller/BaseExpressController";
import {BaseExpressController} from "@/shared/types/controller";
import {createHistory} from "@/history/controller/utils/utils";

type CalculateController = BaseExpressController<CalculationResponseBody, any, any, CalculateExpressionPayload >;

const calculateController: CalculateController = {
    post: createExpressAction(async (payload) => {
        const calculationResult = calculatorService.calculate(payload.expression);
        let newRecord: CalculationResponseBody["newRecord"];

        if(calculationResult != null) {
            newRecord = await createHistory({
                expression: payload.expression,
                expressionResult: calculationResult,
            });
        }
        return { calculationResult, newRecord };
    })
}

export default {
    [Endpoints.CALCULATE]: calculateController
};
