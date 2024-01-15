import {HistoryRepository, RepositoryFactory} from "@/shared/repository/types";
import {HistoryLocalDBRepository} from "@/history/dataAccess/HistoryLocalDBRepository";
import {LocalDB} from "@/history/dataAccess/LocalDB";
import {CalculationHistory, HistoryItem} from "@calculator/common";

const mockedHistory: CalculationHistory = [
    {id: "1", expressionResult: "0", expression: "2-2", calculationDate: new Date("2023-04-15T08:30:00")},
    {id: "2", expressionResult: "4", expression: "2+2", calculationDate: new Date("2022-11-02T18:45:00")},
    {id: "3", expressionResult: "4", expression: "2*2", calculationDate: new Date("2024-07-20T12:15:00")},
    {id: "4", expressionResult: "1", expression: "2/2", calculationDate: new Date("2023-01-08T09:00:00")},
    {id: "5", expressionResult: "4", expression: "2^2", calculationDate: new Date("2023-01-08T09:00:00")},
    {id: "6", expressionResult: "5", expression: "2+3", calculationDate: new Date("2022-06-30T21:30:00")},
    {id: "7", expressionResult: "6", expression: "2+4", calculationDate: new Date("2021-06-30T21:30:00")},
];

export class LocalDBFactory implements RepositoryFactory {
    private readonly db = new LocalDB<HistoryItem>(mockedHistory)

    getHistoryRepository(): HistoryRepository {
        return new HistoryLocalDBRepository(this.db);
    }
}