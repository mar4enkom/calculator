import {CalculatorEvents, CalculatorVariables, OnInputExpressionChangePayload} from "@/calculator";
import {CalculateExpressionPayload, getValidationErrors} from "@calculator/common";
import {initialValidations} from "@/calculator/mvc/controller/utils/initialValidations/initialValidations";
import {AppError} from "@/shared/helpers/error/AppError";
import {ErrorCodes} from "@/shared/contstants/clientErrors";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {DomIds} from "@/shared/contstants/dom";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {historyVariables} from "@/history/mvc/model/variables";
import {calculator} from "@/calculator/calculator/Calculator";

export class CalculatorController {
    private calculatorVariables: CalculatorVariables;
    private calculatorEvents: CalculatorEvents;
    constructor(variables: CalculatorVariables, calculatorEvents: CalculatorEvents) {
        this.calculatorVariables = variables;
        this.calculatorEvents = calculatorEvents;
    }

    setupEventsSubscriptions(): void {
        this.calculatorEvents.onCalculateExpression.subscribe(this.handleCalculateExpression.bind(this));
        this.calculatorEvents.onInputExpressionChange.subscribe(this.handleExpressionInputChange.bind(this));
    }

    private async handleCalculateExpression(payload: CalculateExpressionPayload): Promise<void> {
        try {
            beforeRequest(this.calculatorVariables);
            const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
            if(validationErrors) {
                return this.calculatorVariables.error.setValue(new AppError(validationErrors, ErrorCodes.VALIDATION_ERROR));
            }

            const response = await calculator.calculateExpression(payload);

            this.calculatorVariables.value.setValue(response.calculationResult);

            if(response.newRecord != null) {
                const oldHistoryRecords = historyVariables.value.getValue() || [];
                historyVariables.value.setValue([response.newRecord, ...oldHistoryRecords]);
            }
        } catch (e) {
            const error = handleUnknownError(e);
            this.calculatorVariables.error.setValue(error)
        } finally {
            this.calculatorVariables.loading.setValue(false);
        }
    }

    private handleExpressionInputChange(payload: OnInputExpressionChangePayload): void {
        const input = document.getElementById(DomIds.EXPRESSION_INPUT) as HTMLInputElement;
        input.value = payload.inputValue;
    }
}