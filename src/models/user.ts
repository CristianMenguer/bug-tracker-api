import * as db from '../database'
import User from '../entities/User'
import AppError from '../errors/AppError'

const COLLECTION = 'users'

export const getByUserName = async (username: string): Promise<User[]> => {

    if (!username)
        throw new AppError('Username is empty!', 401)

    const users = await db.get(COLLECTION, { username }) as User[]

    if (users.length < 1)
        throw new AppError('Username not found!', 401)

    return users
}