import { Router, Request, Response } from 'express'
import { UserType } from '../constants/UserType'
import User from '../entities/User'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getAll, getByEmail, getByUsername } from '../models/user'
import { isOnlyLetterLowerCase, isValidEmail } from '../services/ValidateInputs'
import { get } from '../database'

const userRoutes = Router()

userRoutes.use(ensureAuthenticated)


userRoutes.post('/', async (request: Request, response: Response) => {

    try {
        const { name, username, email, password, usertype } = request.body

        if (!name || !username || !email || !password || !usertype)
            throw new AppError('It is missing some parameters!')
        //
        if (!isOnlyLetterLowerCase(username))
            throw new AppError('Only lowercase letters are accepted to username!')
        //
        if (!isValidEmail(email))
            throw new AppError('Email is invalid!')
        //

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

    const users = await getAll()

    for (const user of users)
        delete user.password

    return response.json(users)

})

userRoutes.get('/:input', async (request: Request, response: Response) => {

    const { input } = request.params

    let user

    if (isValidEmail(input))
        user = await getByEmail(input)
    else
        if (isOnlyLetterLowerCase(input))
            user = await getByUsername(input)
        else
            throw new AppError('Invalid Param!')
    //
    if (!user)
        throw new AppError('User not found!', 404)
    //
    delete user.password

    return response.json(user)

})

export default userRoutes