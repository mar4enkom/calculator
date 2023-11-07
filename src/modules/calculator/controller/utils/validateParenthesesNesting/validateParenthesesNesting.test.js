import {validateParenthesesNesting} from "./validateParenthesesNesting.js";

describe('expression parentheses nesting validation', () => {
    test("Empty parentheses", () => {
        expect(validateParenthesesNesting("()")).toBe(false);
    });

    test("Incorrect parentheses order", () => {
        expect(validateParenthesesNesting(")(")).toBe(false);
    });

    test("Outer expression nesting", () => {
        expect(validateParenthesesNesting("(2+(2+(2)+(2)))")).toBe(true);
    });

    test("2+(2+(2)+(2))", () => {
        expect(validateParenthesesNesting("2+(2+(2)+(2))")).toBe(true);
    });
});