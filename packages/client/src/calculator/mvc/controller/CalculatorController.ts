import {
    CalculateExpressionPayload,
    getValidationErrors
} from "@calculator/common";
import {initialValidations} from "@/calculator/mvc/controller/utils/initialValidations/initialValidations";
import {DomIds} from "@/shared/contstants/dom";
import {calculatorVariables, OnInputExpressionChangePayload} from "@/calculator/mvc/model/variables";
import {calculatorEvents} from "@/calculator";
import {calculateExpression} from "@/calculator/mvc/controller/utils/calculateExpression";
import {AppError} from "@/shared/helpers/error/AppError";
import {ErrorCodes} from "@/shared/contstants/clientErrors";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {handleError} from "@/shared/utils/handleError";
import {historyVariables} from "@/history/mvc/model/variables";

class CalculatorController {
    setupEventsSubscriptions(): void {
        calculatorEvents.onCalculateExpression.subscribe(this.handleCalculateExpression.bind(this));
        calculatorEvents.onInputExpressionChange.subscribe(this.handleExpressionInputChange.bind(this));
    }

    private async handleCalculateExpression(payload: CalculateExpressionPayload): Promise<void> {
        const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
        if(validationErrors) {
            const error = new AppError(validationErrors, ErrorCodes.VALIDATION_ERROR);
            calculatorVariables.error.setValue(error);
            return;
        }

        try {
            beforeRequest(calculatorVariables);
            const response = await calculateExpression(payload);
            calculatorVariables.value.setValue(response.calculationResult);
        } catch (error) {
            handleError(error, historyVariables.error);
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
