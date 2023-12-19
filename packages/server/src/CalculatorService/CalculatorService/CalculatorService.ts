import { getInnermostExpressionRegexSource, InnermostExpressionGroups} from "calculatorService/utils/createRegex/getInnermostExpressionRegexSource";
import {ProcessedOperationPriorityLevel} from "calculatorService/types/types";
import {
    CalculatorService as CalculatorServiceInterface,
    CalculateExpressionReturnType,
    getValidationErrors, getFirstMatch
} from "@calculator/common";
import {transformExpression} from "calculatorService/utils/adaptExpression/transformExpression";
import {initialValidations} from "calculatorService/utils/initialValidations";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {parenthesize} from "calculatorService/utils/parenthesize";
import {stringIsNumber} from "calculatorService/utils/stringIsNumber";
import {CalculationErrors} from "calculatorService/constants/errors";
import {toNumberArray} from "calculatorService/utils/toNumberArray";
import {Store} from "../helpers/init/InitialStore/Store";
import {CustomError} from "calculatorService/helpers/CustomError";

export class CalculatorService implements CalculatorServiceInterface {
    calculate(expression: unknown): CalculateExpressionReturnType {
        // Check if the expression is empty and string and return undefined if it is,
        // indicating the absence of expression we can calculate
        if(this.isEmptyInput(expression) || typeof expression !== "string") return { result: undefined };

        const {processedConfig} = Store.getValues();
        const transformedExpression = transformExpression(expression, processedConfig);
        const validationErrors = getValidationErrors(transformedExpression, ...initialValidations);
        if(validationErrors.length > 0) return { errors: validationErrors };

        try {
            const result = this.computeExpression(transformedExpression);
            return { result };
        } catch (e) {
            return e instanceof CustomError
                ? { errors: e.errors }
                : { errors: [{code: "UNKNOWN_ERROR", message: "Unknown error"}] }
        }
    }

    private computeExpression(expression: string): string {
        const {processedConfig} = Store.getValues();
        const innermostNestingRegex = createMemoRegex(getInnermostExpressionRegexSource(processedConfig));

        let currentExpression = expression;
        while (true) {
            const matchedNesting = getFirstMatch(innermostNestingRegex, currentExpression, InnermostExpressionGroups.INNERMOST_EXPRESSION);
            if(matchedNesting == null) break;
            const operationResult = this.computeExpressionWithoutParentheses(matchedNesting);
            currentExpression = currentExpression.replace(parenthesize(matchedNesting), operationResult);
        }
        return this.computeExpressionWithoutParentheses(currentExpression);
    }


    private computeExpressionWithoutParentheses(expression: string): string | never {
        if (stringIsNumber(expression)) return expression;

        const {processedConfig} = Store.getValues();
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
