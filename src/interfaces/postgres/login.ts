import { Pool } from "pg";
import { User, UserWithPassword } from "../../types/user";

export const getUserByUsername = async (dbClient: Pool, username: string): Promise<UserWithPassword | null> => {
    const query = {
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    }

    const { rows, rowCount } = await dbClient.query(query);

    if (rowCount === 0) {
        return null;
    }

    const [{ id, username: foundUsername, password }] = rows;

    return {
        id,
        username: foundUsername,
        password,
    };
}

export const registerUser = async (dbClient: Pool, user: UserWithPassword): Promise<User | null> => {
    const { id, username, password } = user;

    const query = {
        text: 'INSERT INTO users(id, username, password) VALUES ($1, $2, $3) RETURNING *',
        values: [id, username, password],
    }

    const { rows } = await dbClient.query(query);

    if (rows[0]) {
        const [{ id, username }] = rows;
    
        return { id, username }
    }

    return null;
}