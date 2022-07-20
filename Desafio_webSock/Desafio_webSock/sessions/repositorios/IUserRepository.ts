import type { IUser } from "../entidades/IUser";

export interface IUserRepository {
    add(p: IUser): Promise<IUser>;
    get(username: string): Promise<IUser>;
}