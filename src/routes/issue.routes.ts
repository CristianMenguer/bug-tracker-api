import { Router, Request, Response } from 'express'
import { IssueStatus } from '../constants/IssueStatus'
import Project from '../entities/Project'
import AppError from '../errors/AppError'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getIssues } from '../models/issue'
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

        if (!title || !description || !status || !slug)
            throw new AppError('It is missing some parameters!')

        if (!isIssueType(status))
            throw new AppError('Invalid status!')

        const projects: Project[] = await getProjects({ slug })

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
    const issues = await getIssues({
        $and: [
            {
                'project.slug': slug
            },
            {
                number: parseInt(issueNumber)
            }
        ]
    })

if (!issues.length)
    throw new AppError('Issue not found!', 404)

return response.json(issues)
})

issueRoutes.get('/:slugNumber/comments', async (request: Request, response: Response) => {

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
    const issues = await getIssues({
        $and: [
            {
                'project.slug': slug
            },
            {
                number: parseInt(issueNumber)
            }
        ]
    })

    if (!issues.length)
        throw new AppError('Issue not found!', 404)

    const issue = issues[0]

    if (!issue.comments || !issue.comments.length)
        throw new AppError('Issue has no comment!', 404)

    return response.json(issue.comments)
})

issueRoutes.get('/:slugNumber/comments/:commentNumber', async (request: Request, response: Response) => {

    const { slugNumber, commentNumber } = request.params

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
    if (!isNumber(commentNumber))
        throw new AppError('Comment number not found or invalid!')
    //
    const issues = await getIssues({
        $and: [
            {
                'project.slug': slug
            },
            {
                number: parseInt(issueNumber)
            }
        ]
    })

    if (!issues.length)
        throw new AppError('Issue not found!', 404)

    const issue = issues[0]

    if (!issue.comments || !issue.comments.length)
        throw new AppError('Issue has no comment!', 404)
    //
    const comments = issue.comments.filter(comment => comment.number == parseInt(commentNumber))
    //
    if (!comments || !comments.length)
        throw new AppError('Comment not found!', 404)
    //
    return response.json(comments)
})

issueRoutes.get('/', async (request: Request, response: Response) => {
    const issues = await getIssues()

    if (!issues.length)
        throw new AppError('No issue found!', 404)

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
    const issues = await getIssues({
        $and: [
            {
                'project.slug': slug
            },
            {
                number: parseInt(issueNumber)
            }
        ]
    })
    //
    if (!issues.length)
        throw new AppError('Issue not found!', 404)
    //
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