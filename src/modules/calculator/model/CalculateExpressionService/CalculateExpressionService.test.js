import { CalculateExpressionService } from './CalculateExpressionService';
import {testConfig} from "../../tests/config/testConfig.js";
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

describe('validate operation', () => {
    function extractErrorCodes(expression) {
        return calculate(expression).errors.map((error) => error.code)
    }

    test("invalid expression", () => {
        expect(extractErrorCodes("-")).toEqual([CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]);
    });

    test("invalid number of arguments", () => {
        expect(extractErrorCodes("sqrt(1,2)")).toEqual([OperationErrorCodes.NUMBER_OF_ARGUMENTS]);
    });

    test("non-numeric arguments", () => {
        expect(extractErrorCodes("sqrt(a)")).toEqual([OperationErrorCodes.NON_NUMERIC_ARGUMENTS]);
    });

    test("several custom validations", () => {
        expect(extractErrorCodes("sqrt(-1,2)")).toEqual([
            OperationErrorCodes.NUMBER_OF_ARGUMENTS,
            OperationErrorCodes.NON_NEGATIVE_ARGUMENTS,
        ]);
    });

    test("zero division", () => {
        expect(extractErrorCodes("1/0")).toEqual([
            OperationErrorCodes.ZERO_DIVISION,
        ]);
    });

    test("nesting of functions with optional parentheses", () => {
        expect(extractErrorCodes("4!!")).toEqual([
            CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR,
        ]);
    });

    test("empty expression", () => {
        expect(calculate("")).toBeUndefined();
    });

    test("undefined expression", () => {
        expect(calculate(undefined)).toBeUndefined();
    });

    test("null expression", () => {
        expect(calculate(null)).toBeUndefined();
    });
});
