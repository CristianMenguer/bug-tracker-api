import { hash } from 'bcryptjs'

import { getByEmail, getByUsername, createNewUser } from '../models/user'
import User from '../entities/User'
import AppError from '../errors/AppError'

interface RequestDTO {
    name: string
    username: string
    email: string
    password: string
    usertype: string
}

class CreateUserService {
    public async execute({ name, username, email, password, usertype }: RequestDTO): Promise<User> {
        
        let userFromDb = await getByUsername(username)

        if (userFromDb) {
            throw new AppError('Username has already been registered!')
        }

        userFromDb = await getByEmail(email)

        if (userFromDb) {
            throw new AppError('Email has already been registered!')
        }

        const hashedPassword = await hash(password, 8)

        const user = await createNewUser(new User (
            name,
            username,
            email,
            hashedPassword,
            usertype
        ))

        delete user.password
        
        return user
    }
}

export default CreateUserService