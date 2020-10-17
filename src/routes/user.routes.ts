import { Router, Request, Response } from 'express'

const userRoutes = Router()

//userRoutes.use(ensureAuthenticated)

userRoutes.post('/', async (request: Request, response: Response) => {
    return response.json({
        message: 'User Post',
        code: 201
    })
})

userRoutes.get('/', async (request: Request, response: Response) => {
    return response.json({
        message: 'User Get',
        code: 201
    })
})

export default userRoutes