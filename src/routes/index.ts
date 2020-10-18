import { Router, Request, Response } from 'express'

import projectRoutes from './project.routes'
import issueRoutes from './issue.routes'
import userRoutes from './user.routes'
import sessionRoutes from './session.routes'

import { info } from '../database'

const routes = Router()

routes.use('/project', projectRoutes)
routes.use('/user', userRoutes)
routes.use('/issue', issueRoutes)
routes.use('/session', sessionRoutes)

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey, welcome to Cristian Menguer - 2020087 API 👍🏼'
    })
})

export default routes