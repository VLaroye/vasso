import { Pool } from 'pg';
import { Postgresql } from '../../types/interfaces';
import { getUserByUsername, registerUser } from './login';
import { getWorkspaceById, createWorkspace } from './workspaces';

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
        }
    }
}
 