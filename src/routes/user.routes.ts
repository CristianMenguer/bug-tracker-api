import { Router, Request, Response } from 'express'
import { UserType } from '../constants/UserType'
import User from '../entities/User'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'

const userRoutes = Router()

//userRoutes.use(ensureAuthenticated)


userRoutes.post('/', async (request: Request, response: Response) => {

    try {
        const { name, username, email, password, usertype } = request.body

        if (!name || !username || !email || !password || !usertype)
            throw new AppError('It is missing some parameters!')

        const createUser = new CreateUserService()

        const user = await createUser.execute({
            name,
            username,
            email,
            password,
            usertype
        })

        return response.json(user)
    } catch (err) {
        return response.status(409).json({ error: err.message })
    }
})

userRoutes.get('/', async (request: Request, response: Response) => {
    return response.json({
        message: 'User Get',
        code: 201
    })
})

export default userRoutes