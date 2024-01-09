import {CalculatorEvents, CalculatorVariables, OnInputExpressionChangePayload} from "@/calculator";
import {CalculatorApiService} from "@/calculator/api/types";
import {CalculateExpressionPayload, getValidationErrors, TestDigitSymbols} from "@calculator/common";
import {initialValidations} from "@/calculator/mvc/controller/utils/initialValidations/initialValidations";
import {AppError} from "@/shared/helpers/error/AppError";
import {ErrorCodes} from "@/shared/contstants/clientErrors";
import {applyNumberAliasesForPayload} from "@/calculator/mvc/controller/utils/prepareExpression/resolveNumberAliases";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {DomIds} from "@/shared/contstants/dom";


export class CalculatorController {
    private calculatorVariables: CalculatorVariables;
    private calculatorEvents: CalculatorEvents;
    private apiService: CalculatorApiService;
    constructor(variables: CalculatorVariables, calculatorEvents: CalculatorEvents, expressionCalculator: CalculatorApiService) {
        this.calculatorVariables = variables;
        this.calculatorEvents = calculatorEvents;
        this.apiService = expressionCalculator;
    }

    setupEventsSubscriptions(): void {
        this.calculatorEvents.onCalculateExpression.subscribe(this.handleCalculateExpression.bind(this));
        this.calculatorEvents.onInputExpressionChange.subscribe(this.handleExpressionInputChange.bind(this));
    }

    private async handleCalculateExpression(payload: CalculateExpressionPayload): Promise<void> {
        try {
            this.calculatorVariables.value.setValue(undefined);
            this.calculatorVariables.error.setValue(undefined);
            this.calculatorVariables.loading.setValue(true);
            const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
            if(validationErrors) {
                return this.calculatorVariables.error.setValue(new AppError(validationErrors, ErrorCodes.VALIDATION_ERROR));
            }

            const transformedPayload = applyNumberAliasesForPayload({expression: payload.expression}, TestDigitSymbols)
            const response = await this.apiService.calculateExpression(transformedPayload);
            this.calculatorVariables.value.setValue(response);
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