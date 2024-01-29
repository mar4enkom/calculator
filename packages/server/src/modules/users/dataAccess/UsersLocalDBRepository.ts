import {UsersRepository} from "@/shared/helpers/repository/types";
import {GetUserListPagination, User} from "@calculator/common";
import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {LocalDBBaseRepository} from "@/shared/helpers/repository/concreteRepositories/LocalDBBaseRepository";
import {mockedUsers} from "@/shared/helpers/repository/concreteRepositories/mocks";

export class UsersLocalDBRepository
    extends LocalDBBaseRepository<User, GetUserListPagination>
    implements UsersRepository {
    constructor() {
        const db = new LocalDB<User>(mockedUsers)
        super(db);
    }
}