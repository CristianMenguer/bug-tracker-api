import * as db from '../database'
import User from '../entities/User'

const COLLECTION = 'user'

export const createNewUser = async (user: User): Promise<User> => {
    const results = await db.add(COLLECTION, user) as UserResponseInsert
    return results.ops[0]
}

export const getByUsername = async (username: string): Promise<User> => {

    if (!username)
        return new Promise<User>((resolve) => resolve())

    const users = await db.get(COLLECTION, { username }) as User[]

    return users[0]
}

export const getByEmail = async (email: string): Promise<User> => {

    if (!email)
        return new Promise<User>((resolve) => resolve())

    const users = await db.get(COLLECTION, { email }) as User[]

    return users[0]

}

export const getAll = async (): Promise<User[]> => {

    const users = await db.get(COLLECTION) as User[]

    return users

}