export interface Reader<T> {
    findAll(): Promise<T[]>
    findOne(id: string | Partial<T>): Promise<T>
}

export type BaseRepository<T> = Reader<T>