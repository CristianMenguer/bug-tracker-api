import * as db from '../database'
import User from '../entities/User'

const COLLECTION = 'user'

export const createNewUser = async (user: User): Promise<User> => {
    const results = await db.add(COLLECTION, user) as UserResponseInsert
    return results.ops[0]
}

export const getUsers = async (query = {}): Promise<User[]> => {

    const users = await db.get(COLLECTION, query) as User[]

    return users

}