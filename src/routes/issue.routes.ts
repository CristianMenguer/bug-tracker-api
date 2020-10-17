import { Router, Request, Response } from 'express'

const issueRoutes = Router()

//issueRoutes.use(ensureAuthenticated)

issueRoutes.post('/', async (request: Request, response: Response) => {
    return response.json({
        message: 'Issue Post',
        code: 201
    })
})

issueRoutes.get('/', async (request: Request, response: Response) => {
    return response.json({
        message: 'Issue Get',
        code: 201
    })
})

export default issueRoutes