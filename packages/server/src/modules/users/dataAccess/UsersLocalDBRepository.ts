import {UsersRepository} from "@/shared/helpers/repository/types";
import {GetUserListPagination, User} from "@calculator/common";
import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {LocalDBBaseRepository} from "@/shared/helpers/repository/concreteRepositories/LocalDBBaseRepository";
import {mockedUsers} from "@/shared/helpers/repository/concreteRepositories/mocks";

const db = new LocalDB<User>(mockedUsers)
export class UsersLocalDBRepository
    extends LocalDBBaseRepository<User, GetUserListPagination>
    implements UsersRepository {
    constructor() {
        super(db);
    }
}