import z from "zod";
import {userValidator} from "./validations/validations";

export type User = z.infer<typeof userValidator>;
export type UserList = User[];
