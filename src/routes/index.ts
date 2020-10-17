import { Router, Request, Response } from 'express'

import projectRoutes from './project.routes'
import issueRoutes from './issue.routes'
import userRoutes from './user.routes'

const routes = Router()

routes.use('/project', projectRoutes)
routes.use('/user', userRoutes)
routes.use('/issue', issueRoutes)

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey 👍🏼'
    })
})

export default routes