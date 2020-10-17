import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../entities/User'
import { getByUserName } from '../models/user'
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
        
        const usersByUsername: User[] = await getByUserName(username)

        if (!usersByUsername || usersByUsername.length < 1) {
            throw new AppError('User not found!', 401)
        }

        const userByUsername = usersByUsername[0]
        
        const passwordMatched = true//await compare(password, userByUsername.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        

        const { secret, expiresIn } = authConfig.jwt

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