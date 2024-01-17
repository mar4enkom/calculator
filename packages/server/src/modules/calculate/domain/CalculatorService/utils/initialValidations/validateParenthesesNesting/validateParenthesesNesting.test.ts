import {
    validateParenthesesNesting
} from "./validateParenthesesNesting";
import {TestSymbols} from "@calculator/common";

function validateParenthesesNestingMock(expression: string) {
    return validateParenthesesNesting(expression, TestSymbols);
}

describe('expression parentheses nesting validation', () => {
    test("Empty expression", () => {
        expect(validateParenthesesNestingMock("")).toBe(true);
    });

    test("Expression without parentheses", () => {
        expect(validateParenthesesNestingMock("2+3")).toBe(true);
    });

    test("Non-closed parentheses", () => {
        expect(validateParenthesesNestingMock("(")).toBe(false);
    });

    test("Empty parentheses", () => {
        expect(validateParenthesesNestingMock("()")).toBe(false);
    });

    test("Incorrect parentheses order", () => {
        expect(validateParenthesesNestingMock(")2(")).toBe(false);
    });

    test("Outer expression nesting", () => {
        expect(validateParenthesesNestingMock("(2+(2+(2)+(2)))")).toBe(true);
    });

    test("Correct expression", () => {
        expect(validateParenthesesNestingMock("2+(2+(2)+(2))")).toBe(true);
    });

    test("Extra right parentheses", () => {
        expect(validateParenthesesNestingMock("2+(2+(2)+(2)))")).toBe(false);
    });

    test("Empty parentheses inside expression", () => {
        expect(validateParenthesesNestingMock("2+(2+(2)+()+(2)))")).toBe(false);
    });

    test("Specific symbols in parentheses", () => {
        expect(validateParenthesesNestingMock("2+(2^2!.,$^)")).toBe(true);
    });
});