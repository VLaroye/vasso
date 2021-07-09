import { Pool } from 'pg';
import { db } from '../../types/interfaces';
import { getUserByUsername, registerUser } from './login';
import { getWorkspaceById, createWorkspace, listWorkspaces } from './workspaces';

export interface Postgresql extends db {
    dbClient: Pool;
}

export const initDb = (): Postgresql => {
    const pool = new Pool();
    
    return {
        dbClient: pool,
        login: {
            getUserByUsername,
            registerUser,
        },
        workspaces: {
            getWorkspaceById,
            createWorkspace,
            listWorkspaces,
        }
    }
}
 