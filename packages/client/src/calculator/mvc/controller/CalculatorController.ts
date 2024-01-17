import {CalculateExpressionPayload, getValidationErrors} from "@calculator/common";
import {initialValidations} from "@/calculator/mvc/controller/utils/initialValidations/initialValidations";
import {AppError} from "@/shared/helpers/error/AppError";
import {ErrorCodes} from "@/shared/contstants/clientErrors";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {DomIds} from "@/shared/contstants/dom";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {historyVariables} from "@/history/mvc/model/variables";
import {calculator} from "@/calculator/calculator/Calculator";
import {calculatorEvents, calculatorVariables} from "@/calculator";
import {OnInputExpressionChangePayload} from "@/calculator/mvc/model/variables";

class CalculatorController {
    setupEventsSubscriptions(): void {
        calculatorEvents.onCalculateExpression.subscribe(this.handleCalculateExpression.bind(this));
        calculatorEvents.onInputExpressionChange.subscribe(this.handleExpressionInputChange.bind(this));
    }

    private async handleCalculateExpression(payload: CalculateExpressionPayload): Promise<void> {
        try {
            beforeRequest(calculatorVariables);
            const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
            if(validationErrors) {
                return calculatorVariables.error.setValue(new AppError(validationErrors, ErrorCodes.VALIDATION_ERROR));
            }

            const response = await calculator.calculateExpression(payload);

            calculatorVariables.value.setValue(response.calculationResult);

            if(response.newRecord != null) {
                const oldHistoryRecords = historyVariables.value.getValue() || [];
                historyVariables.value.setValue([response.newRecord, ...oldHistoryRecords]);
            }
        } catch (e) {
            const error = handleUnknownError(e);
            calculatorVariables.error.setValue(error)
        } finally {
            calculatorVariables.loading.setValue(false);
        }
    }

    private handleExpressionInputChange(payload: OnInputExpressionChangePayload): void {
        const input = document.getElementById(DomIds.EXPRESSION_INPUT) as HTMLInputElement;
        input.value = payload.inputValue;
    }
}

export const calculatorController = new CalculatorController();