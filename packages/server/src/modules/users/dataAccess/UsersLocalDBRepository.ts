import {UsersRepository} from "@/shared/helpers/repository/types";
import {GetUserListPagination, User} from "@calculator/common";
import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {LocalDBBaseRepository} from "@/shared/helpers/repository/concreteRepositories/LocalDBBaseRepository";

export class UsersLocalDBRepository
    extends LocalDBBaseRepository<User, GetUserListPagination>
    implements UsersRepository {
    constructor(db: LocalDB<User>) {
        super(db);
    }
}