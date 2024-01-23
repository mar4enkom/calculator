import {BaseRepository} from "@/shared/helpers/repository/types";
import {AnyZodObject} from "zod";

export type BaseRepositoryMethod = (params: any) => Promise<any>;
export type BaseRepositoryKeys = keyof BaseRepository<any, any>;

export interface OrmMethodProps<T> {
    before?(p: T): void;
    zodValidation?: AnyZodObject;
}

export type ExpressParams<T extends (...args: [any, any, any, ...any[]]) => any> = [
    Parameters<T>[0],
    Parameters<T>[1],
    Parameters<T>[2],
];

