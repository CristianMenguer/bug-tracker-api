import { Router, Request, Response } from 'express'
import Project from '../entities/Project'
import AppError from '../errors/AppError'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getProjects } from '../models/project'
import CreateProjectService from '../services/CreateProjectService'
import { isOnlyLetterUpperCase } from '../services/ValidateInputs'

const projectRoutes = Router()

projectRoutes.use(ensureAuthenticated)

projectRoutes.post('/', async (request: Request, response: Response) => {
    try {
        const { slug, name, description } = request.body

        if (!slug || !name || !description)
            throw new AppError('It is missing some parameters!')

        if (!isOnlyLetterUpperCase(slug))
            throw new AppError('Only uppercase letters are accepted to slug!')

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

projectRoutes.get('/:slug/issues', async (request: Request, response: Response) => {

    const { slug } = request.params

    if (!slug)
        throw new AppError('Please, inform the slug!', 404)

    const projects: Project[] = await getProjects({ slug })

    if (!projects.length || !projects[0].issues || !projects[0].issues.length)
        throw new AppError('Project/issue not found!', 404)

    const project = projects[0]
    return response.json(project.issues)
    //
})

projectRoutes.get('/:slug', async (request: Request, response: Response) => {
    const { slug } = request.params

    if (!slug)
        throw new AppError('Please, inform the slug!', 404)

    const projects = await getProjects({ slug })

    if (!projects.length)
        throw new AppError('Project not found!', 404)

    const project = projects[0]
    return response.json(project)
    //
})

projectRoutes.get('/', async (request: Request, response: Response) => {
    const projects = await getProjects()

    if (!projects.length)
        throw new AppError('No project found!', 404)

    return response.json(projects)
})

export default projectRoutes