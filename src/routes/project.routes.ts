import { Router, Request, Response } from 'express'

const projectRoutes = Router()

//projectRoutes.use(ensureAuthenticated)

projectRoutes.post('/', async (request: Request, response: Response) => {
    return response.json({
        message: 'Project Post',
        code: 201
    })
})

projectRoutes.get('/', async (request: Request, response: Response) => {
    return response.json({
        message: 'Project Get',
        code: 201
    })
})

export default projectRoutes