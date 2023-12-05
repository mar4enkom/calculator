import {validateParenthesesNesting} from "CalculatorService/validateParenthesesNesting.js";

describe('expression parentheses nesting validation', () => {
    test("Empty expression", () => {
        expect(validateParenthesesNesting("")).toBe(true);
    });

    test("Expression without parentheses", () => {
        expect(validateParenthesesNesting("2+3")).toBe(true);
    });

    test("Non-closed parentheses", () => {
        expect(validateParenthesesNesting("(")).toBe(false);
    });

    test("Empty parentheses", () => {
        expect(validateParenthesesNesting("()")).toBe(false);
    });

    test("Incorrect parentheses order", () => {
        expect(validateParenthesesNesting(")2(")).toBe(false);
    });

    test("Outer expression nesting", () => {
        expect(validateParenthesesNesting("(2+(2+(2)+(2)))")).toBe(true);
    });

    test("Correct expression", () => {
        expect(validateParenthesesNesting("2+(2+(2)+(2))")).toBe(true);
    });

    test("Extra right parentheses", () => {
        expect(validateParenthesesNesting("2+(2+(2)+(2)))")).toBe(false);
    });

    test("Empty parentheses inside expression", () => {
        expect(validateParenthesesNesting("2+(2+(2)+()+(2)))")).toBe(false);
    });

    test("Specific symbols in parentheses", () => {
        expect(validateParenthesesNesting("2+(2^2!.,$^)")).toBe(true);
    });
});