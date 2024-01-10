export type CalculationHistoryItem = {
    id: string;
    expression: string;
    expressionResult: string;
    date: Date;
}

export type CalculationHistory = CalculationHistoryItem[];