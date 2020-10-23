import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../entities/User'
import { getByUsername } from '../models/user'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface RequestDTO {
    username: string
    password: string
}

interface ResponseDTO {
    user: User
    token: string
}

class AuthenticateUserService {

    public async execute({ username, password }: RequestDTO): Promise<ResponseDTO> {

        if (!username)
            throw new AppError('Username is empty!', 401)

        if (!password)
            throw new AppError('Password is empty!', 401)

        const userByUsername = { ...await getByUsername(username) }

        if (!userByUsername) {
            throw new AppError('User not found!', 401)
        }

        let passwordMatched = false

        if (userByUsername.password)
            passwordMatched = await compare(password, userByUsername.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect username/password combination!', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        delete userByUsername.password
        delete userByUsername.created_at
        delete userByUsername.updated_at
        
        userByUsername._id += ''

        const token = sign({ username }, secret, {
            subject: userByUsername._id,
            expiresIn
        })

        return {
            user: userByUsername,
            token
        }
    }
}

export default AuthenticateUserService