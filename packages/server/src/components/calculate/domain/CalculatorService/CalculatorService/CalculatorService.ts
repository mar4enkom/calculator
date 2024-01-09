import {
    CalculateExpressionReturnType,
    CalculatorService as CalculatorServiceInterface,
    ProcessedOperationPriorityLevel
} from "@/calculate/domain/CalculatorService/types/types";
import {transformExpression} from "@/calculate/domain/CalculatorService/utils/adaptExpression/transformExpression";
import {getFirstMatch, getValidationErrors} from "@calculator/common";
import {
    getInnermostExpressionRegexSource,
    InnermostExpressionGroups
} from "@/calculate/domain/CalculatorService/utils/createRegex/getInnermostExpressionRegexSource";
import {createMemoRegex} from "@/calculate/domain/CalculatorService/utils/createMemoRegex";
import {parenthesize} from "@/calculate/domain/CalculatorService/utils/parenthesize";
import {stringIsNumber} from "@/calculate/domain/CalculatorService/utils/stringIsNumber";
import {CustomError} from "@/calculate/domain/CalculatorService/helpers/CustomError";
import {getInitialValidations} from "@/calculate/domain/CalculatorService/utils/initialValidations";
import {CalculationErrors} from "@/calculate/domain/CalculatorService/constants/errors";
import {toNumberArray} from "@/calculate/domain/CalculatorService/utils/toNumberArray";
import {configStore} from "@/shared/store/configStore/configStore";


class CalculatorService implements CalculatorServiceInterface {
    calculate(expression: unknown): CalculateExpressionReturnType {
        // Check if the expression is empty and string and return undefined if it is,
        // indicating the absence of expression we can calculate
        if(this.isEmptyInput(expression) || typeof expression !== "string") return { result: null };

        const {processedConfig, symbols, digitSymbols} = configStore.get();
        const transformedExpression = transformExpression(expression, processedConfig, symbols);
        const validationErrors = getValidationErrors(transformedExpression, ...getInitialValidations(symbols));
        if(validationErrors) return { errors: validationErrors };

        try {
            const result = this.computeExpression(transformedExpression);
            return { result };
        } catch (e) {
            return e instanceof CustomError
                ? { errors: e.errors }
                : { errors: [CalculationErrors.UNKNOWN_ERROR] }
        }
    }

    private computeExpression(expression: string): string {
        const {processedConfig, symbols} = configStore.get();
        const innermostNestingRegex = createMemoRegex(getInnermostExpressionRegexSource(processedConfig, symbols));

        let currentExpression = expression;
        while (true) {
            const matchedNesting = getFirstMatch(innermostNestingRegex, currentExpression, InnermostExpressionGroups.INNERMOST_EXPRESSION);
            if(matchedNesting == null) break;
            const operationResult = this.computeExpressionWithoutParentheses(matchedNesting);
            currentExpression = currentExpression.replace(parenthesize(matchedNesting, symbols), operationResult);
        }
        return this.computeExpressionWithoutParentheses(currentExpression);
    }


    private computeExpressionWithoutParentheses(expression: string): string | never {
        if (stringIsNumber(expression)) return expression;

        const {processedConfig} = configStore.get();
        let currentExpression = expression;
        for (const operationCategory of processedConfig) {
            currentExpression = this.calculateExpressionForOperationCategory(currentExpression, operationCategory);
            if(stringIsNumber(currentExpression)) return currentExpression;
        }
        // If we have iterated through all categories and the result is not a number,
        // throw a CalculationError indicating an error in the input expression
        throw new CustomError([CalculationErrors.INVALID_EXPRESSION_INPUT]);
    }

    private calculateExpressionForOperationCategory(expression: string, operationCategory: ProcessedOperationPriorityLevel): string {
        const operationDetails = operationCategory.extractOperationDetails(expression);
        if(operationDetails == null) return expression;

        const { operationBody, operands, calculateExpression } = operationDetails;
        const calculatedOperands = operands.map(expr => this.computeExpressionWithoutParentheses(expr));
        const operationResult = calculateExpression(...toNumberArray(calculatedOperands));

        const newExpression = expression.replace(operationBody, operationResult.toString());
        return this.calculateExpressionForOperationCategory(newExpression, operationCategory);
    }

    private isEmptyInput(inputStr: unknown): boolean {
        return inputStr == null || inputStr === "";
    }
}

export default new CalculatorService();
