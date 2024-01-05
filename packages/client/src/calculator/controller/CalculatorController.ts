import {CalculateExpressionPayload, getValidationErrors, TestDigitSymbols} from "@calculator/common";
import {initialValidations} from "./utils/initialValidations/initialValidations";
import {applyNumberAliasesForPayload} from "./utils/prepareExpression/resolveNumberAliases";
import {AppError} from "../../shared/helpers/AppError";
import {handleUnknownError} from "../../shared/utils/handleUnknownError";
import {CalculatorVariables} from "../observer/types";
import {CalculatorApiService} from "../api/types";
import {ErrorCodes} from "../../shared/contstants/clientErrors";

export class CalculatorController {
    private calculatorVariables: CalculatorVariables;
    private apiService: CalculatorApiService;
    constructor(variables: CalculatorVariables, expressionCalculator: CalculatorApiService) {
        this.calculatorVariables = variables;
        this.apiService = expressionCalculator;

        this.handleCalculateExpression = this.handleCalculateExpression.bind(this);
    }

    async handleCalculateExpression(payload: CalculateExpressionPayload) {
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
}