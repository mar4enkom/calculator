import {HistoryApiService as HistoryApiServiceInterface} from "../types";
import {HttpRequestHandler} from "../../../shared/api/HttpRequestHandler";
import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";

const mockedHistory = [
    {id: "1", expressionResult: "4", expression: "2+2"},
    {id: "2", expressionResult: "3", expression: "2+12342342342342342342343"},
];

export class HistoryApiService extends HttpRequestHandler implements HistoryApiServiceInterface {
    constructor() {
        super(process.env.API_BASE);
    }

    fetchHistory(payload: CalculationHistoryPayload): Promise<CalculationHistory> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockedHistory);
            }, 1000);
        });
    }
}