import {BasicOperationList, FunctionOperationList} from "userConfig/operations/types";
import {ResultBox} from "viewService/helpers/ui/ResultBox";
import {ErrorList} from "viewService/helpers/ui/ErrorList";
import {CalculateExpressionReturnType} from "shared/types/calculationResult";

export interface CalculatorUIKitInterface {
    result: ResultBox;
    errorsList: ErrorList;
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
    renderSignButtonList(signList: BasicOperationList, root: HTMLDivElement): void
    renderConstantButtonList(constantList: BasicOperationList, root: HTMLDivElement): void
    renderFunctionButtonList(functionList: FunctionOperationList, root: HTMLDivElement): void
    renderDigitButtonList(root: HTMLDivElement): void
    renderOperationList(primaryOperationList: FunctionOperationList, root: HTMLDivElement): void
}

export interface IExpressionCalculator {
    calculate: (expr: unknown) => CalculateExpressionReturnType;
}