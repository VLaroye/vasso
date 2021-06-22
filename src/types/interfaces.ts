import { Pool } from "pg";
import { User, UserWithPassword } from "./user";
import Workspace from "./workspace";

export interface db {
    dbClient: any,
    login: loginInterface
    workspaces: workspacesInterface
}

export interface Postgresql extends db {
    dbClient: Pool;
}

interface loginInterface {
    getUserByUsername: (dbClient: any, username: string) => Promise<UserWithPassword | null>
    registerUser: (dbClient: any, user: UserWithPassword) => Promise<User | null>
}

interface workspacesInterface {
    getWorkspaceById: (dbClient: any, id: string) => Promise<Workspace | null>
    createWorkspace: (dbClient: any, workspace: Workspace) => Promise<Workspace | null>
    listWorkspaces: (dbClient: any, userId: string) => Promise<Workspace[]>
}