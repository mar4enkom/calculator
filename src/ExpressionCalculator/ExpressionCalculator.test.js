import { ExpressionCalculator } from 'CalculatorService/ExpressionCalculator.js';
import {CalculationErrorCodes, InitialValidationErrorsCodes, OperationErrorCodes} from "CalculatorService/constants/errorCodes.js";
import {testConfig, TestSymbols} from "Shared/tests/mocks/testConfig.js";

const expressionCalculator = new ExpressionCalculator(testConfig);
const calculate = expressionCalculator.calculate.bind(expressionCalculator);

describe('calculate expression', () => {
    const extractResult = (expr) => calculate(expr).result;
    test('2+2', () => {
        expect(extractResult('2+2')).toBe("4");
    });

    test('-2+4', () => {
        expect(extractResult('-2+4')).toBe("2");
    });

    test('infinity', () => {
        expect(extractResult('Infinity')).toBe("Infinity");
        expect(extractResult(TestSymbols.INFINITY)).toBe("Infinity");
        expect(extractResult(`${TestSymbols.INFINITY}+${TestSymbols.INFINITY}`)).toBe("Infinity");
        expect(extractResult(`(sqrt(2)*sin(45°)+${TestSymbols.INFINITY}+4/2-sqrt(9)/3+1/0)*(10/2+sqrt(16/4)-sin(30°)/2)`)).toBe("Infinity");
    });

    test('division by zero', () => {
        expect(extractResult("1/0")).toBe("Infinity");
    });

    test('division by zero inside large expression', () => {
        expect(extractResult("(sqrt(2)*sin(45°)+4/2-sqrt(9)/3+1/0)*(10/2+sqrt(16/4)-sin(30°)/2)")).toBe("Infinity");
    });

    test('large expression 1', () => {
        expect(extractResult('(sqrt(2)*sin(45°)+4/2-sqrt(9)/3)*(10/2+sqrt(16/4)-sin(30°)/2)'))
            .toBe("13.5");
    });

    test("large expression 2", () => {
        expect(extractResult('(sqrt(4)+((15-5*sin(30°))-2)*(3+1))+((2+2)*2)'))
            .toBe("52")
    });

    test('postfix function', () => {
       expect(extractResult('(4+1)!')).toBe("120");
    });

    test('optional parentheses in function', () => {
        expect(extractResult('sqrt25')).toBe("5");
    });

    test('several optional parentheses in function', () => {
        expect(extractResult('sqrt25+sqrt4+(sqrt1+1)')).toBe("9");
    });

    test('optional parentheses in postfix function', () => {
        expect(extractResult('5!')).toBe("120");
    });

    test('function nesting', () => {
        expect(extractResult('sqrt(sqrt(16))')).toBe("2");
    });

    test('operationDetails priority', () => {
       expect(extractResult('2+2*2^3')).toBe("18");
    });

    test("pi", () => {
        expect(extractResult('π')).toBe(Math.PI.toString());
    });

    test("e", () => {
        expect(extractResult('e')).toBe(Math.E.toString());
    });

    test("degrees", () => {
        expect(extractResult('90°')).toBe("1.5707963267948966");
    });

    test("prefix postfix functions combination", () => {
        expect(extractResult("(sqrt(25))!")).toBe("120");
    });

    test("postfix function nesting", () => {
        expect(extractResult("(1+(3)!)!")).toBe("5040");
    });

    test("postfix function nesting with optional parentheses", () => {
        expect(extractResult("(1+3!)!")).toBe("5040");
    });
});

describe('Invalid Expressions', () => {
    function extractErrorCodes(expression) {
        return calculate(expression)?.errors?.map((error) => error.code)
    }

    test("Empty expression", () => {
        expect(extractErrorCodes("")).toEqual(undefined);
    });

    test("invalid expression", () => {
        expect(extractErrorCodes("-")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });

    test("Unbalanced parentheses", () => {
        expect(extractErrorCodes("(2 + 3")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("2 + 3)")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("((2 + 3)")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("2 + 3))")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("(2 + (3 * 4) / (5 - 2)")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("2 + sqrt(4")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("2 + pow(3, 2")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("sqrt(16) + pow(2, 3")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
        expect(extractErrorCodes("sqrt(pow(4, 2) + 9")).toEqual([InitialValidationErrorsCodes.INVALID_PARENTHESES_NESTING]);
    });

    test("Incorrect operators order", () => {
        expect(extractErrorCodes("2 + + 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 * / 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 / * 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 + * 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });

    test("Invalid characters", () => {
        expect(extractErrorCodes("2 + $ 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 & 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 # 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });

    test("Missing operands in mixed operators and parentheses", () => {
        expect(extractErrorCodes("2 * (3 + 5) /")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });

    test("nesting of functions with optional parentheses", () => {
        expect(extractErrorCodes("4!!")).toEqual([
            CalculationErrorCodes.INVALID_EXPRESSION_INPUT,
        ]);
    });

    test("prefix declaration for postfix function", () => {
        expect(extractErrorCodes("!(5)")).toEqual([
            CalculationErrorCodes.INVALID_EXPRESSION_INPUT,
        ]);
    });

    test("infinity", () => {
        expect(extractErrorCodes(`${TestSymbols.INFINITY}-${TestSymbols.INFINITY}`))
            .toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });
});

describe('calculation runtime error codes', () => {
    function extractErrorCodes(expression) {
        return calculate(expression)?.errors?.map((error) => error.code)
    }

    test("invalid number of arguments", () => {
        expect(extractErrorCodes("sqrt(1,2)")).toEqual([OperationErrorCodes.NUMBER_OF_ARGUMENTS]);
    });

    test("several custom validations", () => {
        expect(extractErrorCodes("sqrt(-1,2)")).toEqual([
            OperationErrorCodes.NUMBER_OF_ARGUMENTS,
            OperationErrorCodes.NON_NEGATIVE_ARGUMENTS,
        ]);
    });
});
