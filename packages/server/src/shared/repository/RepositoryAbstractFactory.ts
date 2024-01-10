import {assert} from "@calculator/common";
import {DBName, RepositoryFactory} from "@/shared/repository/types";
import {LocalDBFactory} from "@/shared/repository/concreteRepositories/LocalDBFactory";

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
                return new LocalDBFactory();
            default:
                assert(dbName);
        }
    }
}

export const repositoryFactory = new RepositoryAbstractFactory("localDB").getDBFactory();
