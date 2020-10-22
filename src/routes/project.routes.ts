import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getAll } from '../models/project'
import CreateProjectService from '../services/CreateProjectService'

const projectRoutes = Router()

projectRoutes.use(ensureAuthenticated)

projectRoutes.post('/', async (request: Request, response: Response) => {
    try {
        const { slug, name, description } = request.body

        if (!slug || !name || !description)
            throw new AppError('It is missing some parameters!')

        if (!/^[a-z]+$/.test(slug))
            throw new AppError('Only lowercase letters are accepted in slug!')

        const createProject = new CreateProjectService()

        const project = await createProject.execute({
            slug,
            name,
            description
        })

        return response.json(project)
    } catch (err) {
        return response.status(409).json({ error: err.message })
    }
})

projectRoutes.get('/', async (request: Request, response: Response) => {
    const projects = await getAll()

    for (const project of projects) {
        delete project.created_at
        delete project.updated_at
    }

    return response.json(projects)
})

export default projectRoutes