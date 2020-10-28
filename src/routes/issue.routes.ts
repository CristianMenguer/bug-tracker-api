import { Router, Request, Response } from 'express'
import { IssueStatus } from '../constants/IssueStatus'
import AppError from '../errors/AppError'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getIssues, getBySlugNumber } from '../models/issue'
import { getProjects } from '../models/project'
import CreateIssueService from '../services/CreateIssueService'
import UpdateIssueStatusService from '../services/UpdateIssueStatusService'
import { isIssueType, isNumber } from '../services/ValidateInputs'

const issueRoutes = Router()

issueRoutes.use(ensureAuthenticated)

issueRoutes.post('/:slug', async (request: Request, response: Response) => {
    try {

        const { slug } = request.params

        const { title, description, status } = request.body

        if (!title || !description || !status)
            throw new AppError('It is missing some parameters!')
        
        if (!isIssueType(status))
            throw new AppError('Invalid status!')

        const projects = await getProjects({ slug })

        if (!projects.length)
            throw new AppError('Project not found!', 404)
        
        const project = projects[0]

        const createIssue = new CreateIssueService()

        const issue = await createIssue.execute({
            title,
            description,
            status,
            project
        })

        return response.json(issue)

    } catch (err) {
        return response.status(409).json({ error: err.message })
    }
})

issueRoutes.get('/:slugNumber', async (request: Request, response: Response) => {

    const { slugNumber } = request.params

    const splitString = slugNumber.split('-')
    //
    if (splitString.length != 2)
        throw new AppError('Format slug-number not found!')
    //
    const [slug, issueNumber] = splitString
    //
    if (!isNumber(issueNumber))
        throw new AppError('Format slug-number not found!')
    //
    const issues = await getBySlugNumber(slug, issueNumber)

    if (!issues.length)
        throw new AppError('Issue not found!', 404)

    return response.json(issues)
})

issueRoutes.get('/', async (request: Request, response: Response) => {
    const issues = await getIssues({})

    return response.json(issues)
})

issueRoutes.put('/:slugNumber/:newStatus', async (request: Request, response: Response) => {

    const { slugNumber, newStatus } = request.params

    const splitString = slugNumber.split('-')
    //
    if (splitString.length != 2)
        throw new AppError('Format slug-number not found!')
    //
    const [slug, issueNumber] = splitString
    //
    if (!isNumber(issueNumber))
        throw new AppError('Format slug-number not found!')
    //
    if (!isIssueType(newStatus))
        throw new AppError('Invalid new status!')
    //
    const issues = await getBySlugNumber(slug, issueNumber)
    const issue = issues[0]
    //
    const updateIssueStatus = new UpdateIssueStatusService()
    const updatedIssue = await updateIssueStatus.execute({
        issue,
        newStatus: newStatus as IssueStatus
    })
    //
    return response.json(updatedIssue)
})

export default issueRoutes