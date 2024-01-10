import {assert, CalculationHistory, CalculationHistoryItem} from "@calculator/common";
import {DBName, RepositoryFactory} from "@/shared/repository/types";
import {LocalDBFactory} from "@/shared/repository/concreteRepositories/LocalDBFactory";
import {LocalDB} from "@/history/dataAccess/LocalDB";

const mockedHistory: CalculationHistory = [
    {id: "1", expressionResult: "0", expression: "2-2", date: new Date("2023-04-15T08:30:00")},
    {id: "2", expressionResult: "4", expression: "2+2", date: new Date("2022-11-02T18:45:00")},
    {id: "3", expressionResult: "4", expression: "2*2", date: new Date("2024-07-20T12:15:00")},
    {id: "4", expressionResult: "1", expression: "2/2", date: new Date("2023-01-08T09:00:00")},
    {id: "5", expressionResult: "4", expression: "2^2", date: new Date("2023-01-08T09:00:00")},
    {id: "6", expressionResult: "5", expression: "2+3", date: new Date("2022-06-30T21:30:00")},
    {id: "7", expressionResult: "6", expression: "2+4", date: new Date("2021-06-30T21:30:00")},
];

const localDB = new LocalDB<CalculationHistoryItem>(mockedHistory);

class RepositoryAbstractFactory {
    private dbFactory: RepositoryFactory;

    constructor(dbName: DBName) {
        this.dbFactory = this.createFactory(dbName);
    }

    public getDBFactory() {
        return this.dbFactory;
    }

    private createFactory(dbName: DBName): RepositoryFactory {
        switch (dbName) {
            case "localDB":
                return new LocalDBFactory(localDB);
            default:
                assert(dbName);
        }
    }
}

export const repositoryFactory = new RepositoryAbstractFactory("localDB").getDBFactory();
