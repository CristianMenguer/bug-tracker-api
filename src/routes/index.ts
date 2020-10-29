import { Router, Request, Response } from 'express'

import projectRoutes from './project.routes'
import issueRoutes from './issue.routes'
import userRoutes from './user.routes'
import commentRoutes from './comment.routes'
import sessionRoutes from './session.routes'

const routes = Router()

routes.use('/projects', projectRoutes)
routes.use('/users', userRoutes)
routes.use('/issues', issueRoutes)
routes.use('/comments', commentRoutes)
routes.use('/session', sessionRoutes)

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey, welcome to Cristian Menguer - 2020087 API 👍🏼'
    })
})

routes.get('*', (request: Request, response: Response) => {
    return response.status(404).json({
        message: 'Welcome to Cristian Menguer - 2020087 API 👍🏼',
        error: 'Route not found! Check your URL/Request!',
        bad_url: request.url
    })
})

export default routes