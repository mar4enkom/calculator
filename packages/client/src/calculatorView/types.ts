import {Maybe} from "@calculator/common/dist/types/common/typeUtils";
import {ErrorBody, UserConfigResponseBody} from "@calculator/common";
import {CalculatorUIKit} from "viewService/helpers/ui/CalculatorUIKit";

export interface ContentBox {
    render(result: Maybe<string>): void;
    clear(): void;
}

export interface ContentList {
    render(errorList: Maybe<ErrorBody>): void;
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

    getExpression(): string;
    createCEButton(): HTMLButtonElement;
    createParenthesesButton(): HTMLButtonElement;
    createEqualsButton(options: CreateEqualsButtonArgs): HTMLButtonElement;
    createDefaultButton(options: CreateDefaultButtonArgs): HTMLButtonElement;
    createFunctionButton(options: CreateFunctionButtonArgs): HTMLButtonElement;
}

export interface CalculatorViewService {
    render(userConfig: UserConfigResponseBody): HTMLDivElement
}