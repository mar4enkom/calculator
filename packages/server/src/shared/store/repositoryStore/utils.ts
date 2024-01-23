import {DBName, RepositoryFactory} from "@/shared/helpers/repository/types";
import {LocalDBFactory} from "@/shared/helpers/repository/concreteRepositories/LocalDBFactory";
import {assert} from "@calculator/common";

export function createRepositoryFactory(dbName: DBName): RepositoryFactory {
    switch (dbName) {
        case "localDB":
            return new LocalDBFactory();
        default:
            assert(dbName);
    }
}