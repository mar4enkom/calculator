import {HistoryRepository} from "./types";
import {BaseMockRepository} from "../../../shared/repository/BaseMockRepository";
import {CalculationHistoryItem} from "@calculator/common";

const mockedHistory = [
    {id: "1", expressionResult: "0", expression: "2-2"},
    {id: "2", expressionResult: "4", expression: "2+2"},
    {id: "3", expressionResult: "4", expression: "2*2"},
    {id: "4", expressionResult: "1", expression: "2/2"},
    {id: "5", expressionResult: "4", expression: "2^2"},
    {id: "6", expressionResult: "5", expression: "2+3"},
    {id: "7", expressionResult: "6", expression: "2+4"},
];

class MockHistoryRepository extends BaseMockRepository<CalculationHistoryItem> implements HistoryRepository {
    async getLastRecords() {
        return Promise.resolve(this.queryBuilder.slice(0,5));
    }
}

export default new MockHistoryRepository(mockedHistory);