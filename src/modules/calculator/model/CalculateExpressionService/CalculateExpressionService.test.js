import {operationsConfig} from "../../../../../userConfig/operations/index.js";
import { CalculateExpressionService } from './CalculateExpressionService';

describe('CalculateExpressionService', () => {
    test('should calculate a valid expression', () => {
        const calculator = new CalculateExpressionService(operationsConfig);

        expect(calculator.calculateExpression('2+2')).toBe("4");
    });
});
