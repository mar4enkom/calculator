import {operationsConfig} from "UserConfig/index.js";
import {CalculateExpressionController} from "./CalculateExpressionController.js";
import {ExpressionCalculator} from "Calculator/ExpressionCalculator/index.js";
import {Digits} from "UserConfig/constants/constants.js";
import {CalculationErrorCodes} from "Calculator/ExpressionCalculator/constants/errorCodes.js";
import {testConfig} from "Calculator/shared/tests/mocks/testConfig.js";
import {mockModel} from "Calculator/shared/tests/mocks/mockModel.js";

const controller = new CalculateExpressionController(mockModel, testConfig);
const transformExpression = controller.transformExpression.bind(controller);

describe('prepare expression', () => {
    test("called all prepare methods", () => {
        const expression = 'test';
        jest.spyOn(controller, 'transformExpression');

        controller.handleCalculateExpression.call(controller, expression);

        expect(controller.transformExpression).toHaveBeenCalledWith(expression);

        controller.transformExpression.mockRestore();
    });
});
