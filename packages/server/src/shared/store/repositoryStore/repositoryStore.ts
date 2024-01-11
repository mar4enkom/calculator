import {createStore} from "@/shared/store/helpers/createStore";
import {RepositoryFactory} from "@/shared/repository/types";
import {createRepositoryFactory} from "@/shared/store/repositoryStore/utils";

const appRepository = createRepositoryFactory("localDB");

export const repositoryStore = createStore<RepositoryFactory>(appRepository);