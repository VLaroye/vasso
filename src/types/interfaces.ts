import { Pool } from "pg";
import { User, UserWithPassword } from "./user";

export interface db {
    dbClient: any,
    login: loginInterface
}

export interface Postgresql extends db {
    dbClient: Pool;
}

interface loginInterface {
    getUserByUsername: (dbClient: any, username: string) => Promise<UserWithPassword | null>
    registerUser: (dbClient: any, user: UserWithPassword) => Promise<User | null>
}