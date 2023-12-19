import {Maybe} from "./typeUtils";
import {CalculationErrors} from "./calculationService";

export interface ContentBox {
    render(result: Maybe<string>): void;
    clear(): void;
}

export interface ContentList {
    render(errorList: Maybe<CalculationErrors["errors"]>): void;
    clear(): void;
}

export type RenderEqualsButtonArgs = {
    onClick: () => void,
    root: HTMLDivElement
}

export type CreateEqualsButtonArgs = {
    onClick(): void;
}

export type CreateDefaultButtonArgs = {
    sign: string
}

export type CreateFunctionButtonArgs = CreateDefaultButtonArgs & {
    postfixForm: boolean;
}

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
    createEqualsButton(options: CreateEqualsButtonArgs): HTMLButtonElement;
    createDefaultButton(options: CreateDefaultButtonArgs): HTMLButtonElement;
    createFunctionButton(options: CreateFunctionButtonArgs): HTMLButtonElement;
}

export interface CalculatorViewService {
    ui: CalculatorUIKitInterface;
    renderDotButton(root: HTMLDivElement): void;
    renderCEButton(root: HTMLDivElement): void
    renderEqualsButton(s: RenderEqualsButtonArgs): void
    renderParenthesesButton(root: HTMLDivElement): void
    renderSignButtonList(signList: any, root: HTMLDivElement): void
    renderConstantButtonList(constantList: any, root: HTMLDivElement): void
    renderFunctionButtonList(functionList: any, root: HTMLDivElement): void
    renderDigitButtonList(root: HTMLDivElement): void
    renderOperationList(primaryOperationList: any, root: HTMLDivElement): void
}