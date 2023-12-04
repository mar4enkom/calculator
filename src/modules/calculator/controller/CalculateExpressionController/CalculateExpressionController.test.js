import {CalculateExpressionController} from "./CalculateExpressionController.js";
import {ExpressionCalculator} from "../../ExpressionCalculator/index.js";
import {operationsConfig} from "@userConfig/index.js";
import {Numbers} from "@userConfig/constants/constants.js";
import {CalculationErrorCodes} from "../../ExpressionCalculator/constants/errorCodes.js";
import {testConfig} from "../../shared/tests/mocks/testConfig.js";
import {mockModel} from "../../shared/tests/mocks/mockModel.js";

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
