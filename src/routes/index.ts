import { Router, Request, Response } from 'express'

import projectRoutes from './project.routes'

const routes = Router()

routes.use('/project', projectRoutes)

routes.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hey 👍🏼'
    })
})

export default routes