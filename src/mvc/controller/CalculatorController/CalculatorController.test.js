import {CalculatorController} from "./CalculatorController.js";
import {Digits} from "UserConfig/constants/constants.js";
import {testConfig} from "Shared/tests/mocks/testConfig.js";
import {mockModel} from "Shared/tests/mocks/mockModel.js";
import {mockCalculationService} from "../../../shared/tests/mocks/mockCalculationService.js";

const controller = new CalculatorController(mockModel, mockCalculationService);
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
