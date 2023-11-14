import { CalculateExpressionService } from './CalculateExpressionService';
import {testConfig} from "../../shared/tests/mocks/testConfig.js";
import {CalculationErrorCodes, OperationErrorCodes} from "../constants/errorCodes.js";

const calculator = new CalculateExpressionService(testConfig);
const calculate = calculator.calculate.bind(calculator);

describe('calculate expression', () => {
    test('2+2', () => {
        expect(calculate('2+2')).toBe("4");
    });

    test('-2+4', () => {
        expect(calculate('-2+4')).toBe("2");
    });

    test('with spaces', () => {
        expect(calculate('- 2  + 4 ')).toBe("2");
    });

    test('with capitalized letters', () => {
        expect(calculate('SqRT(4)')).toBe("2");
    });

    test('large expression 1', () => {
        expect(calculate('(sqrt(2)*sin(45°)+4/2-sqrt(9)/3)*(10/2+sqrt(16/4)-sin(30°)/2)'))
            .toBe("13.5");
    });

    test("large expression 2", () => {
        expect(calculate('(sqrt(4)+((15-5*sin(30°))-2)*(3+1))+((2+2)*2)'))
            .toBe("52")
    });

    test('postfix function', () => {
       expect(calculate('(4+1)!')).toBe("120");
    });

    test('optional parentheses in function', () => {
        expect(calculate('sqrt25')).toBe("5");
    });

    test('optional parentheses in postfix function', () => {
        expect(calculate('5!')).toBe("120");
    });

    test('function nesting', () => {
        expect(calculate('sqrt(sqrt(16))')).toBe("2");
    });

    test('operations priority', () => {
       expect(calculate('2+2*2^3')).toBe("18");
    });

    test("pi", () => {
        expect(calculate('π')).toBe(Math.PI.toString());
    });

    test("e", () => {
        expect(calculate('e')).toBe(Math.E.toString());
    });

    test("degrees", () => {
        expect(calculate('90°')).toBe("1.5707963267948966");
    });

    test("prefix postfix functions combination", () => {
        expect(calculate("(sqrt(25))!")).toBe("120");
    });

    test("postfix function nesting", () => {
        expect(calculate("(1+(3)!)!")).toBe("5040");
    });

    test("postfix function nesting with optional parentheses", () => {
        expect(calculate("(1+3!)!")).toBe("5040");
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
        expect(extractErrorCodes("(2 + 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 + 3)")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("((2 + 3)")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 + 3))")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
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

    test("Invalid function usage", () => {
        expect(extractErrorCodes("2 + sqrt(4")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
        expect(extractErrorCodes("2 + pow(3, 2")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });

    test("Unbalanced parentheses in nested expressions", () => {
        expect(extractErrorCodes("(2 + (3 * 4) / (5 - 2)")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });

    test("Mismatched functions and operators", () => {
        expect(extractErrorCodes("sqrt(16) + pow(2, 3")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
    });

    test("Unclosed parentheses in nested sqrt and pow", () => {
        expect(extractErrorCodes("sqrt(pow(4, 2) + 9")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT]);
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
