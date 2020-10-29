import { Router, Request, Response } from 'express'
import AppError from '../errors/AppError'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import { getComments } from '../models/comment'
import { isNumber, isOnlyLetterLowerCase, isValidEmail } from '../services/ValidateInputs'
import { getUsers } from '../models/user'
import { getIssues } from '../models/issue'
import CreateCommentService from '../services/CreateCommentService'
import User from '../entities/User'

const commentRoutes = Router()

commentRoutes.use(ensureAuthenticated)

commentRoutes.get('/', async (request: Request, response: Response) => {

    const comments = await getComments()

    if (!comments.length)
        throw new AppError('No comment found!', 404)

    return response.json(comments)

})

commentRoutes.get('/:input', async (request: Request, response: Response) => {

    const { input } = request.params

    let users: User[]

    if (isValidEmail(input))
        users = await getUsers({ email: input })
    else
        if (isOnlyLetterLowerCase(input))
            users = await getUsers({ username: input })
        else
            throw new AppError('Invalid Param!')
    //
    if (!users.length)
        throw new AppError('User not found!', 404)
    //

    const user = users[0]
    
    const comments = await getComments({ user_id: user._id?.toString() })

    if (!comments.length)
        throw new AppError('This user has not commented yet!', 404)

    return response.json(comments)

})

commentRoutes.post('/:slugNumber', async (request: Request, response: Response) => {

    const { slugNumber } = request.params

    const { title, text } = request.body

    if (!title || !text)
        throw new AppError('It is missing some parameters!')

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
    //
    const issue = issues[0]

    const createComment = new CreateCommentService()

    const comment = await createComment.execute({
        title,
        text,
        user_id: request.user.id,
        issue
    })

    return response.json(comment)
})

export default commentRoutes