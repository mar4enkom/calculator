import {ExpressParams} from "@/shared/types/express";
import {CalculateExpressionPayload, CalculationResponseBody} from "@calculator/common";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {HistoryOrm, repositoryOrmFactory} from "@/shared/helpers/orm/RepositoryOrmFactory";
import {BaseExpressController} from "@/shared/helpers/controller/BaseExpressController";

class CalculateController extends BaseExpressController {
    constructor(
        private historyOrm: HistoryOrm
    ) {
        super();
    }
    async calculateExpression(...params: ExpressParams<CalculateExpressionPayload, CalculationResponseBody>): Promise<void> {
        this.handleRequest(...params, async (payload) => {
            const calculationResult = calculatorService.calculate(payload.expression);
            let newRecord: CalculationResponseBody["newRecord"];

            // TODO: we should add before and additional logic here. Move this logic into historyModel
            if(calculationResult != null) {
                newRecord = await this.historyOrm.addItem({
                    expression: payload.expression,
                    expressionResult: calculationResult,
                    calculationDate: new Date(),
                    id: (new Date()).toDateString(),
                });
            }
            return { calculationResult, newRecord };
        })
    }
}

export const calculatorController
    = new CalculateController(repositoryOrmFactory.getHistoryOrm());