import {CalculatorController} from "./CalculatorController";
import {CalculatorModel} from "mvc/model";
import {ExpressionCalculator} from "calculatorService/ExpressionCalculator/ExpressionCalculator";
import {testConfig} from "shared/tests/mocks/testConfig";

const mockModel = new CalculatorModel();
const calculationService = new ExpressionCalculator();
const controller = new CalculatorController(mockModel, calculationService);

describe('prepare expression', () => {
    test("called all prepare methods", () => {
        const expression = 'test';
        jest.spyOn(controller, 'transformExpression');

        controller.handleCalculateExpression.call(controller, expression);

        expect(controller.transformExpression).toHaveBeenCalledWith(expression);
    });
});
