import {CalculateExpressionReturnType} from "./calculationResult";
import {ContentBox, ContentList} from "./viewService";

export interface CalculatorUIKitInterface {
    result: ContentBox;
    errorsList: ContentList;
    inputElement: HTMLInputElement;
    functionsColumn: HTMLDivElement;
    numbersColumn: HTMLDivElement;
    operationsColumn: HTMLDivElement;

    getExpression(): string;
    createCEButton(): HTMLButtonElement;
    createParenthesesButton(): HTMLButtonElement;
    createEqualsButton(options: { onClick(): void }): HTMLButtonElement;
    createDefaultButton(options: { sign: string }): HTMLButtonElement;
    createFunctionButton(options: { sign: string; postfixForm: boolean }): HTMLButtonElement;
}

export interface ICalculatorViewService {
    ui: CalculatorUIKitInterface;
    renderDotButton(root: HTMLDivElement): void;
    renderCEButton(root: HTMLDivElement): void
    renderEqualsButton(s: {onClick(): void, root: HTMLDivElement}): void
    renderParenthesesButton(root: HTMLDivElement): void
    renderSignButtonList(signList: any, root: HTMLDivElement): void
    renderConstantButtonList(constantList: any, root: HTMLDivElement): void
    renderFunctionButtonList(functionList: any, root: HTMLDivElement): void
    renderDigitButtonList(root: HTMLDivElement): void
    renderOperationList(primaryOperationList: any, root: HTMLDivElement): void
}

export interface IExpressionCalculator {
    calculate: (expr: unknown) => CalculateExpressionReturnType;
}

export type CalculateExpressionFunction = (...args: any[]) => number;
export type Validation<ErrorCode extends string = string> = {
    validate: (...args: Parameters<CalculateExpressionFunction>) => boolean;
    message: string;
    code: ErrorCode;
}
