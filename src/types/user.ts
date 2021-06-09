export interface UserWithPassword extends User {
    password: string,
}

export interface User {
    id: string,
    username: string,
}