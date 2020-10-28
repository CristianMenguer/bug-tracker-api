import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getUsers } from '../models/user'
import { isOnlyLetterLowerCase, isValidEmail } from '../services/ValidateInputs'

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

    const users = await getUsers()

    return response.json(users)

})

userRoutes.get('/:input', async (request: Request, response: Response) => {

    const { input } = request.params

    let users

    if (isValidEmail(input))
        users = await getUsers({ email: input })
    else
        if (isOnlyLetterLowerCase(input))
            users = await getUsers({ username: input })
        else
            throw new AppError('Invalid Param!')
    //
    if (!users.length)
        throw new AppError('User not found!', 404)
    //

    const user = users[0]

    return response.json(user)

})

export default userRoutes