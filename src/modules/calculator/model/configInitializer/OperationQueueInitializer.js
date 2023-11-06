import {OperationByPriority, Operations} from "../../../../constants/operations.js";
import {Regex} from "../../../../constants/regex.js";
import {Symbols} from "../../../../constants/constants.js";
import {stringIsNumber} from "../../../../utils/stringIsNumber.js";
import {OperationValidator} from "./OperationValidator.js";
import {safeRegexSymbol} from "../../../../utils/safetyRegexSymbol.js";
import {
    getFunctionOperationSignsRegexSource, getFunctionRegexSource,
    getOperationSignsRegexSource
} from "../utils/getOperationSignsRegexSource.js";

export class OperationQueueInitializer {
    static instance;

    static getInstance() {
        if(!OperationQueueInitializer.instance) {
            OperationQueueInitializer.instance = new OperationQueueInitializer();
        }
        return OperationQueueInitializer.instance;
    }

    constructor() {
        this.operationValidator = OperationValidator.getInstance();
    }

    init(initialConfig) {
        if(!initialConfig) throw new Error("No config was passed");

        const operationQueue = [];
        const operationCategoryNames = Object.keys(initialConfig);
        operationCategoryNames.sort((a, b) => initialConfig[a].priority - initialConfig[b].priority);

        for (const categoryName of operationCategoryNames) {
            const operations = initialConfig[categoryName];
            operations.sort((a, b) => a.priority - b.priority);
            let samePriorityOperations = [];
            let maxPriority = operations[0]?.priority ?? 0;

            for (const operation of operations) {
                if(operation.priority == null || operation.priority === maxPriority) {
                    samePriorityOperations.push(operation);
                } else if(operation.priority > maxPriority) {
                    operationQueue.push(this.#getOperationObject(categoryName, samePriorityOperations));
                    maxPriority = operation.priority;
                    samePriorityOperations = [];
                    samePriorityOperations.push(operation);
                }
            }
            operationQueue.push(this.#getOperationObject(categoryName, samePriorityOperations));
        }

        return operationQueue;
    }

    #getOperationObject(operationCategory, operationsList) {
        const operationsWithValidation = operationsList.map((operationProps) =>
            this.operationValidator.withValidatedCalc(operationProps));

        const extractOperationBody = this.#getExtractOperationBodyFunc(operationsWithValidation, operationCategory);
        const extractOperationSign = this.#getExtractOperationSignFunc(operationsWithValidation, operationCategory);
        const extractOperands = this.#getExtractOperandsFunc(operationCategory);

        return {
            operationCategory,
            operations: operationsWithValidation,
            extractOperationBody,
            extractOperationSign,
            extractOperands,
        }
    }

    #getExtractOperationBodyFunc (operationsList, operationCategory) {
        return (expression) => {
            const operationSignRegexSource = getOperationSignsRegexSource(operationsList);
            const operationRegexSourceByCategory = {
                [Operations.CONSTANT]: `${operationSignRegexSource}`,
                [Operations.SIGN]: `${Regex.NUMBER.source}${operationSignRegexSource}`,
                [Operations.OPERATOR]: `${Regex.NUMBER.source}${operationSignRegexSource}${Regex.NUMBER.source}`,
                [Operations.FUNCTION]: getFunctionRegexSource(operationsList),
            }

            const operationRegexSource = operationRegexSourceByCategory[operationCategory];
            if(operationRegexSource == null) throw new Error(`No operation category ${operationCategory}`)

            const operationRegex = new RegExp(operationRegexSource);
            return operationRegex.exec(expression)?.[0];
        }
    }

    #getExtractOperationSignFunc(operationsList, operationCategory) {
        return (expression) => {
            const operationsRangeSignRegexSource = getOperationSignsRegexSource(operationsList);

            let operationSignRegexSource;

            switch (operationCategory) {
                case Operations.CONSTANT:
                case Operations.FUNCTION:
                case Operations.SIGN:
                    operationSignRegexSource = operationsRangeSignRegexSource;
                    break;
                case Operations.OPERATOR:
                    operationSignRegexSource = `(?<=\\d)${operationsRangeSignRegexSource}(?=${Regex.NUMBER.source})`;
                    break;
                default:
                    throw new Error(`No operation category ${operationCategory}`);
            }

            const operationSignRegex = new RegExp(operationSignRegexSource);
            return operationSignRegex.exec(expression)?.[0];
        }
    }

    #getExtractOperandsFunc(operationCategory) {
        const extractOperandsFuncByCategory = {
            [Operations.CONSTANT]: (sign, expression) => [],
            [Operations.SIGN]: (sign, expression) => [expression.slice(0, expression.indexOf(sign))],
            [Operations.OPERATOR]: (sign, expression) => expression.split(sign),
            [Operations.FUNCTION]: (sign, expression) => {
                const argsStr = expression.slice(expression.indexOf(Symbols.LP)+1, expression.indexOf(Symbols.RP));
                return argsStr.split(Symbols.COMMA);
            },
        }
        const extractOperandsFunc = extractOperandsFuncByCategory[operationCategory];
        if(extractOperandsFunc == null) throw new Error(`No operation category ${operationCategory}`);

        return extractOperandsFunc;
    }
}