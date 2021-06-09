import { User, UserWithPassword } from '../types/user';
import { db } from '../types/interfaces';
  
export const getUserByUsername = async (db: db, username: string): Promise<UserWithPassword | null> => {    
    return db.login.getUserByUsername(db.dbClient, username);
}

export const registerUser = async (db: db, user: UserWithPassword): Promise<User | null> => {
    return db.login.registerUser(db.dbClient, user);
}