import {
    CalculateExpressionPayload,
    CalculationResponseBody,
    CalculationResult,
    getValidationErrors
} from "@calculator/common";
import {initialValidations} from "@/calculator/mvc/controller/utils/initialValidations/initialValidations";
import {AppError} from "@/shared/helpers/error/AppError";
import {ErrorCodes} from "@/shared/contstants/clientErrors";
import {DomIds} from "@/shared/contstants/dom";
import {historyVariables} from "@/history/mvc/model/variables";
import {calculator} from "@/calculator/calculator/Calculator";
import {calculatorVariables, OnInputExpressionChangePayload} from "@/calculator/mvc/model/variables";
import {BaseController} from "@/shared/helpers/controller/BaseController";
import {calculatorEvents} from "@/calculator";

class CalculatorController extends BaseController<CalculationResult | undefined> {
    constructor() {
        super(calculatorVariables);
    }
    setupEventsSubscriptions(): void {
        calculatorEvents.onCalculateExpression.subscribe(this.handleCalculateExpression.bind(this));
        calculatorEvents.onInputExpressionChange.subscribe(this.handleExpressionInputChange.bind(this));
    }

    private async handleCalculateExpression(payload: CalculateExpressionPayload): Promise<void> {
        const validationErrors =
            getValidationErrors(payload.expression, ...initialValidations);
        if(validationErrors) {
            const error = new AppError(validationErrors, ErrorCodes.VALIDATION_ERROR);
            return calculatorVariables.error.setValue(error);
        }

        const fetcher = calculator.calculateExpression;
        this.handleAsyncEvent<CalculateExpressionPayload, CalculationResponseBody>(fetcher, payload, {
            transformAfter(valueBefore) {
                return valueBefore.calculationResult
            },
            after(response) {
                if(response.newRecord != null) {
                    const oldHistoryRecords = historyVariables.value.getValue() || [];
                    historyVariables.value.setValue([response.newRecord, ...oldHistoryRecords]);
                }
            }
        })
    }

    private handleExpressionInputChange(payload: OnInputExpressionChangePayload): void {
        const input = document.getElementById(DomIds.EXPRESSION_INPUT) as HTMLInputElement;
        input.value = payload.inputValue;
    }
}

export const calculatorController = new CalculatorController();