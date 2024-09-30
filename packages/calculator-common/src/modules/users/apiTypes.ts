import {ApiSuccessResponse} from "../../types/api/common";
import {User} from "./types";
import z from "zod";
import {getUserListPagination, getUserListPayloadValidation} from "./validations/validations";

export type GetUserListPayload = z.infer<typeof getUserListPayloadValidation>;
export type GetUserListPagination = z.infer<typeof getUserListPagination>;
export type GetUserListResponseBody = User[];
export type GetUserListSuccessResponse = ApiSuccessResponse<User>;

export type AddUserPayload = User;
export type AddUserResponseBody = User;
export type AddUserSuccessResponse = ApiSuccessResponse<User>;
