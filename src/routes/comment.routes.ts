import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import { getComments } from '../models/comment'

const commentRoutes = Router()

commentRoutes.use(ensureAuthenticated)


commentRoutes.get('/', async (request: Request, response: Response) => {

    const comments = await getComments()
    
    return response.json(comments)

})

export default commentRoutes