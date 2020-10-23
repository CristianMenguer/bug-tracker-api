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

routes.get('*', (request: Request, response: Response) => {
    return response.status(404).json({
        message: 'Welcome to Cristian Menguer - 2020087 API 👍🏼',
        error: 'Route not found! Check your URL/Request!'
    })
})

export default routes