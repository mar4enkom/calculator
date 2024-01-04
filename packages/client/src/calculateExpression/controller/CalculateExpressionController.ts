import {CalculateExpressionPayload, getValidationErrors, TestDigitSymbols} from "@calculator/common";
import {initialValidations} from "./utils/initialValidations/initialValidations";
import {applyNumberAliasesForPayload} from "./utils/prepareExpression/resolveNumberAliases";
import {AppError} from "../../shared/helpers/AppError";
import {handleUnknownError} from "../../shared/utils/handleUnknownError";
import {CalculatorVariables} from "../observer/types";
import {CalculatorApiService} from "../api/types";
import {ErrorCodes} from "../../shared/contstants/clientErrors";

export class CalculateExpressionController {
    private variables: CalculatorVariables;
    private apiService: CalculatorApiService;
    constructor(variables: CalculatorVariables, expressionCalculator: CalculatorApiService) {
        this.variables = variables;
        this.apiService = expressionCalculator;

        this.calculateExpressionController = this.calculateExpressionController.bind(this);
    }

    async calculateExpressionController(payload: CalculateExpressionPayload) {
        try {
            this.variables.calculatorLoading.setValue(true);
            const validationErrors = getValidationErrors(payload.expression, ...initialValidations);
            if(validationErrors) {
                return this.variables.calculatorError.setValue(new AppError(validationErrors, ErrorCodes.VALIDATION_ERROR));
            }

            const transformedPayload = applyNumberAliasesForPayload({expression: payload.expression}, TestDigitSymbols)
            const response = await this.apiService.calculateExpression(transformedPayload);
            this.variables.calculatorValue.setValue(response);
        } catch (e) {
            console.log(JSON.stringify(e));
            const error = handleUnknownError(e);
            this.variables.calculatorError.setValue(error)
        } finally {
            this.variables.calculatorLoading.setValue(false);
        }
    }
}