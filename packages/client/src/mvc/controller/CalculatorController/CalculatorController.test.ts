import {CalculatorController} from "./CalculatorController";
import {CalculatorModel} from "mvc/model";
import {DummyCalculationService} from "../../../index";

const mockModel = new CalculatorModel();
const calculationService = new DummyCalculationService();
const controller = new CalculatorController(mockModel, calculationService);

describe('prepare expression', () => {
    test("called all prepare methods", () => {
        const expression = 'test';
        jest.spyOn(controller, 'transformExpression');

        controller.handleCalculateExpression.call(controller, expression);

        expect(controller.transformExpression).toHaveBeenCalledWith(expression);
    });
});
