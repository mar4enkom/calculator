import {CalculateExpressionController} from "./CalculateExpressionController.js";
import {CalculateExpressionService} from "../../model/index.js";
import {operationsConfig} from "../../../../../userConfig/index.js";
import {Numbers} from "../../../../../userConfig/constants/constants.js";
import {CalculationErrorCodes} from "../../model/constants/errorCodes.js";
import {TestSymbols} from "../../shared/tests/mocks/testConfig.js";
import {mockModel} from "../../shared/tests/mocks/mockModel.js";

const controller = new CalculateExpressionController(mockModel);
const prepareExpression = controller.prepareExpression.bind(controller);

describe('prepare expression', () => {
    test("called all prepare methods", () => {
        const expression = 'test';
        jest.spyOn(controller, 'formatExpression');
        jest.spyOn(controller, 'transformExpression');
        jest.spyOn(controller, 'validateExpression');

        controller.prepareExpression.call(controller, expression);

        expect(controller.formatExpression).toHaveBeenCalledWith(expression);
        expect(controller.transformExpression).toHaveBeenCalledWith(expression);
        expect(controller.validateExpression).toHaveBeenCalledWith(expression);

        controller.formatExpression.mockRestore();
        controller.transformExpression.mockRestore();
        controller.validateExpression.mockRestore();
    });

    test('remove spaces', () => {
        expect(prepareExpression('- 2  + 4 ')).toBe("-2+4");
    });

    test('transform to lower case', () => {
        expect(prepareExpression('SqRT(4)')).toBe("sqrt(4)");
    });
});
