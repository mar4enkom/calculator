import {BaseRepository} from "@/shared/repository/types";

export type BaseRepositoryMethod = (params: any) => Promise<any>;
export type BaseRepositoryKeys = keyof BaseRepository<any, any>;

export interface ControllerMethodProps<T> {
    before?(p: T): void;
}

export type ExpressParams<T extends (...args: [any, any, any, ...any[]]) => any> = [
    Parameters<T>[0],
    Parameters<T>[1],
    Parameters<T>[2],
];

