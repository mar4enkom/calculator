import {operationsConfig} from "UserConfig/index.js";
import {CalculatorController} from "./CalculatorController.js";
import {ExpressionCalculator} from "CalculatorService/index.js";
import {Digits} from "UserConfig/constants/constants.js";
import {CalculationErrorCodes} from "CalculatorService/constants/errorCodes.js";
import {testConfig} from "Shared/tests/mocks/testConfig.js";
import {mockModel} from "Shared/tests/mocks/mockModel.js";

const controller = new CalculatorController(mockModel, testConfig);
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
