import * as db from '../database'
import User from '../entities/User'

const COLLECTION = 'users'

export const createNewUser = async (user: User): Promise<User> => {
    const usersCount = await db.count(COLLECTION)
    console.log('users: ' + usersCount)
    const results = await db.add(COLLECTION, user) as ResponseInsert
    //console.log(results.insertedId)
    return results.ops[0]
}

export const getByUserName = async (username: string): Promise<User> => {

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