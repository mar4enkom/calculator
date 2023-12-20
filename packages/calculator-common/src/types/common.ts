export type CalculateExpressionFunction = (...args: any[]) => number;
export type Validation<ErrorCode extends string = string> = {
    validate: (...args: Parameters<CalculateExpressionFunction>) => boolean;
    message: string;
    code: ErrorCode;
}
export interface Singleton<T> {
    new(...args: any[]): any;
    getInstance(): T;
}