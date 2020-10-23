import { Router, Request, Response } from 'express'
import { IssueStatus } from '../constants/IssueStatus'
import AppError from '../errors/AppError'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getIssues, getByProjectSlug, getBySlugNumber } from '../models/issue'
import CreateIssueService from '../services/CreateIssueService'
import UpdateIssueStatusService from '../services/UpdateIssueStatusService'
import { isIssueType, isNumber } from '../services/ValidateInputs'

const issueRoutes = Router()

issueRoutes.use(ensureAuthenticated)

issueRoutes.post('/', async (request: Request, response: Response) => {
    try {
        const { title, description, project_id } = request.body

        if (!title || !description || !project_id)
            throw new AppError('It is missing some parameters!')

        const createIssue = new CreateIssueService()

        const issue = await createIssue.execute({
            title,
            description,
            project_id
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
    const [ slug, issueNumber ] = splitString
    //
    if (!isNumber(issueNumber))
        throw new AppError('Format slug-number not found!')
    //
    const issues = await getBySlugNumber(slug, issueNumber)

    return response.json(issues)
})

issueRoutes.get('/', async (request: Request, response: Response) => {
    const issues = await getIssues()

    return response.json(issues)
})

issueRoutes.put('/:slugNumber/:newStatus', async (request: Request, response: Response) => {
    
    const { slugNumber, newStatus } = request.params

    const splitString = slugNumber.split('-')
    //
    if (splitString.length != 2)
        throw new AppError('Format slug-number not found!')
    //
    const [ slug, issueNumber ] = splitString
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