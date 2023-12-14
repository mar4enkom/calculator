import {stringIsNumber} from "calculatorService/utils/stringIsNumber";
import {toNumberArray} from "calculatorService/utils/toNumberArray";
import {CalculationErrorCode} from "calculatorService/constants/errorCodes";
import {CalculationErrors} from "calculatorService/constants/errors";
import { getInnermostExpressionRegexSource, InnermostExpressionGroups} from "calculatorService/utils/createRegex/getInnermostExpressionRegexSource";
import {CustomError} from "calculatorService/helpers/CustomError";
import {parenthesize} from "calculatorService/utils/parenthesize";
import {createMemoRegex} from "calculatorService/utils/createMemoRegex";
import {transformExpression} from "calculatorService/utils/adaptExpression/transformExpression";
import {initialValidations} from "calculatorService/utils/initialValidations";
import {processConfig} from "calculatorService/utils/processConfig/processConfig";
import {getValidationErrors, IExpressionCalculator, UserConfig} from "@calculator/common";
import {getFirstMatch} from "@calculator/common";
import {ProcessedConfig, ProcessedOperationPriorityLevel} from "calculatorService/types/types";
import {CalculateExpressionReturnType} from "@calculator/common";

export class ExpressionCalculator implements IExpressionCalculator{
    private prioritizedOperations: ProcessedConfig;
    constructor(operationsConfig: UserConfig) {
        this.prioritizedOperations = processConfig(operationsConfig);
    }

    calculate(expression: unknown): CalculateExpressionReturnType {
        // Check if the expression is empty and string and return undefined if it is,
        // indicating the absence of expression we can calculate
        if(this.isEmptyInput(expression) || typeof expression !== "string") return { result: undefined };

        const transformedExpression = transformExpression(expression, this.prioritizedOperations);
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
        const innermostNestingRegex = createMemoRegex(getInnermostExpressionRegexSource(this.prioritizedOperations));

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

        let currentExpression = expression;
        for (const operationCategory of this.prioritizedOperations) {
            currentExpression = this.calculateExpressionForOperationCategory(currentExpression, operationCategory);
            if(stringIsNumber(currentExpression)) return currentExpression;
        }
        // If we have iterated through all categories and the result is not a number,
        // throw a CalculationError indicating an error in the input expression
        throw new CustomError({
            code: "INVALID_EXPRESSION_INPUT",
            message: "Invalid expression input"
        });
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
