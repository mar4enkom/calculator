import {Maybe} from "./typesUtils";
import {CalculationErrors} from "./calculationResult";

export interface ContentBox {
    render(result: Maybe<string>): void;
    clear(): void;
}

export interface ContentList {
    render(errorList: Maybe<CalculationErrors["errors"]>): void;
    clear(): void;
}