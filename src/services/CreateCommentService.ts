import Issue from '../entities/Issue'
import Comment from '../entities/Comment'
import AppError from '../errors/AppError'
import { createNewComment, getComments } from '../models/comment'

interface RequestDTO {
    title: string
    text: string
    user_id: string
    issue: Issue
}

class CreateCommentService {
    public async execute({ title, text, user_id, issue }: RequestDTO): Promise<Comment> {

        const commentsByIssue = await getComments({ issue_id: issue._id })

        if (commentsByIssue.filter(comment => comment.title == title).length > 0)
            throw new AppError('Comment has already been registered!')

        const commentNumber = commentsByIssue.length

        try {
            const comment = await createNewComment(new Comment(
                title,
                text,
                issue._id,
                user_id,
                commentNumber + 1
            ))

            return comment
        } catch (err) {
            console.log('Error: > CreateCommentService > execute:')
            console.log(err)
            throw new AppError('Internal error. Please, try again!', 500)
        }
    }
}

export default CreateCommentService