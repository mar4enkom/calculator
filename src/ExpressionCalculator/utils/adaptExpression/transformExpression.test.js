import {transformExpression} from "calculatorService/utils/adaptExpression/transformExpression.ts";
import {OperationCategoryName} from "userConfig/constants/operationCategoryName.ts";

const mockOperationCategories = [{"categoryName":"constant","operations":[{"name":"pi","sign":"π"},{"name":"e","sign":"e"},{"name":"Infinity","sign":"∞"}]},{"categoryName":"sign","operations":[{"name":"degree","sign":"°"}]},{"categoryName":"function","operations":[{"name":"sine","sign":"sin"},{"name":"square root","sign":"sqrt","validations":{"nonNegativeArguments":true}},{"name":"cosine","sign":"cos"},{"name":"sum","sign":"sum"},{"name":"diff","sign":"diff"},{"name":"mult","sign":"mult"},{"name":"div","sign":"div"},{"name":"log","sign":"log","validations":{"nonNegativeArguments":true}},{"name":"log2","sign":"log2","validations":{"nonNegativeArguments":true}},{"name":"log10","sign":"log10","validations":{"nonNegativeArguments":true}},{"name":"exponentiation","sign":"pow"},{"name":"factorial","sign":"!","validations":{"nonNegativeArguments":true},"postfixForm":true},{"name":"factorial","sign":"fact","validations":{"nonNegativeArguments":true}}]},{"categoryName":"operator","operations":[{"name":"power","sign":"^","priority":0}]},{"categoryName":"operator","operations":[{"name":"Multiply","sign":"*","priority":1},{"name":"Divide","sign":"/","priority":1},{"name":"Remainder of the division","sign":"%","priority":1}]},{"categoryName":"operator","operations":[{"name":"Add","sign":"+","priority":2},{"name":"Subtract","sign":"-","priority":2}]}];
function testTransformExpression(expression) {
    return transformExpression(expression, mockOperationCategories);
}

describe('business logic format expression', () => {
    test('remove spaces', () => {
        expect(testTransformExpression('- 2  + 4 ')).toBe("-2+4");
    });

    test('transform to lower case', () => {
        expect(testTransformExpression('SqRT(4)')).toBe("sqrt(4)");
    });
});