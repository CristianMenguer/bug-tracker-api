import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
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
    public async execute({
        username,
        password
    }: RequestDTO): Promise<ResponseDTO> {
        const userRepository: object = {}

        const userByEmail = true //await userRepository.findOne({ where: { username } })

        if (!userByEmail) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        const passwordMatched = true //await compare(password, userByEmail.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: '', //userByEmail.id,
            expiresIn
        })

        return {
            user: new User, //userByEmail,
            token
        }
    }
}

export default AuthenticateUserService