import {ApiSuccessResponse} from "../../types/api/common";
import {DigitSymbols, OperationsConfig, Symbols} from "./types";

export type UserConfigResponseBody = {
    operations: OperationsConfig;
    digitSymbols: DigitSymbols;
    symbols: Symbols;
}

export interface UserConfigSuccessResponse extends ApiSuccessResponse<UserConfigResponseBody> {}

export type UserConfigPayload = undefined;