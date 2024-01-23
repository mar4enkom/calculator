import {createStore} from "@/shared/store/helpers/createStore";
import {DBName, RepositoryFactory} from "@/shared/helpers/repository/types";
import {createRepositoryFactory} from "@/shared/store/repositoryStore/utils";

const appRepository = createRepositoryFactory(process.env.DB as DBName);

export const repositoryStore = createStore<RepositoryFactory>(appRepository);