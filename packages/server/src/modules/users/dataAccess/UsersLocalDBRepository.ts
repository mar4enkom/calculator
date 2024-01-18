import {LocalDBBaseRepository, UsersRepository} from "@/shared/repository/types";
import {GetUserListPagination, User} from "@calculator/common";
import {LocalDB} from "@/history/dataAccess/LocalDB";

export class UsersLocalDBRepository extends LocalDBBaseRepository<User, GetUserListPagination> implements UsersRepository {
    constructor(db: LocalDB<User>) {
        super(db);
    }
}