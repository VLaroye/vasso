import { Pool } from "pg";
import Workspace from "../../types/workspace";

export const getWorkspaceById = async (dbClient: Pool, id: string): Promise<Workspace | null> => {    
    const query = {
        text: 'SELECT * FROM workspaces WHERE id = $1',
        values: [id],
    }    

    const result = await dbClient.query(query);
    
    if (result.rows[0]) {
        const [{ id, name }] = result.rows;
    
        // Returns workspace
        return { id, name }
    }

    return null;
}

export const createWorkspace = async (dbClient: Pool, workspace: Workspace): Promise<Workspace | null> => {
    // Create INSERT query    
    const query = {
        text: 'INSERT INTO workspaces(id, name) VALUES ($1, $2) RETURNING *',
        values: [workspace.id, workspace.name],
    }
    // Execute query
    const { rows } = await dbClient.query(query);

    if (rows[0]) {
        const [{ id, name }] = rows;    
    
        // Returns created workspace
        return { id, name };
    }

    return null;
}