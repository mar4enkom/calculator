import {RepositoryOrm} from "@/shared/controller/RepositoryOrm";
import {GetHistoryListPayload, GetUserListPayload, HistoryItem, User} from "@calculator/common";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

export type HistoryOrm = RepositoryOrm<HistoryItem, GetHistoryListPayload>;
export type UsersOrm = RepositoryOrm<User, GetUserListPayload>;

class RepositoryOrmFactory {
    getHistoryOrm(): HistoryOrm {
        const repo = repositoryStore.get().getHistoryRepository();
        return new RepositoryOrm(repo);
    }

    getUsersOrm(): RepositoryOrm<User, GetUserListPayload> {
        const repo = repositoryStore.get().getUsersRepository();
        return new RepositoryOrm(repo);
    }
}

export const repositoryOrmFactory = new RepositoryOrmFactory();