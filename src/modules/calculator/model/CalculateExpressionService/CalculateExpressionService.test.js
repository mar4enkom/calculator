import { CalculateExpressionService } from './CalculateExpressionService';
import {testConfig} from "../../tests/config/testConfig.js";
import {OperationErrorCodes} from "../constants/errorCodes.js";

const calculator = new CalculateExpressionService(testConfig);

describe('calculate expression', () => {
    test('2+2', () => {
        expect(calculator.calculate('2+2')).toBe("4");
    });

    test('large expression 1', () => {
        expect(calculator.calculate('(sqrt(2)*sin(45°)+4/2-sqrt(9)/3)*(10/2+sqrt(16/4)-sin(30°)/2)'))
            .toBe("13.5");
    });

    test("large expression 2", () => {
        expect(calculator.calculate('(sqrt(4)+((15-5*sin(30°))-2)*(3+1))+((2+2)*2)'))
            .toBe("52")
    });

    test('postfix function', () => {
       expect(calculator.calculate('(4+1)!')).toBe("120");
    });

    test('optional parentheses in function', () => {
        expect(calculator.calculate('sqrt25')).toBe("5");
    });

    test('optional parentheses in postfix function', () => {
        expect(calculator.calculate('5!')).toBe("120");
    });

    test('function nesting', () => {
        expect(calculator.calculate('sqrt(sqrt(16))')).toBe("2");
    });

    test('operations priority', () => {
       expect(calculator.calculate('2+2*2^3')).toBe("18");
    });

    test("pi", () => {
        expect(calculator.calculate('π')).toBe(Math.PI.toString());
    });

    test("e", () => {
        expect(calculator.calculate('e')).toBe(Math.E.toString());
    });

    test("degrees", () => {
        expect(calculator.calculate('90°')).toBe("1.5707963267948966");
    });
});

function extractErrorCodes(expression) {
    return calculator.calculate(expression).errors.map((error) => error.code)
}

describe('validate expression', () => {
    test("Invalid number of arguments", () => {
        expect(extractErrorCodes("sqrt(1,2)")).toEqual([OperationErrorCodes.NUMBER_OF_ARGUMENTS]);
    });
});
