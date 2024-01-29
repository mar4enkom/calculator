import {
    CalculateExpressionPayload,
    CalculationResponseBody,
    Endpoints,
} from "@calculator/common";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {createExpressAction} from "@/shared/utils/expressAction";
import {addHistory} from "@/history/controller/utils/utils";
import {ExpressController} from "@/shared/types/controller";

const calculateController: ExpressController<Endpoints.CALCULATE> = {
    post: createExpressAction<CalculationResponseBody, CalculateExpressionPayload>(async (payload) => {
        const calculationResult = calculatorService.calculate(payload.expression);
        let newRecord: CalculationResponseBody["newRecord"];

        if(calculationResult != null) {
            newRecord = await addHistory({
                expression: payload.expression,
                expressionResult: calculationResult,
            });
        }
        return { calculationResult, newRecord };
    }),
}

export default {
    [Endpoints.CALCULATE]: calculateController
};
