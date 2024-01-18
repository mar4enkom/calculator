import z from "zod";
import {getPaginationValidator} from "../../../shared/validations/commonValidations";
import {userSortByKeyNames} from "./utils";

export const userValidator = z.object({
    id: z.string({required_error: "id is required"}),
    username: z.string({required_error: "username is required"}),
    email: z.string({required_error: "email is required"}),
    password: z.string({required_error: "password is required"}),
});

export const getUserListPagination = getPaginationValidator(userSortByKeyNames);
export const getUserListPayloadValidation = getUserListPagination;
export const addUserPayloadValidation = userValidator;
