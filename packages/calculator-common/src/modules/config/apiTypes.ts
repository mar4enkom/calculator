import {ApiSuccessResponse} from "../../types/api/common";
import {DigitSymbols, OperationsConfig, Symbols} from "./types";

export type Config = {
    operations: OperationsConfig;
    digitSymbols: DigitSymbols;
    symbols: Symbols;
}

export interface GetConfigSuccessResponse extends ApiSuccessResponse<Config> {}

export type GetConfigPayload = undefined;