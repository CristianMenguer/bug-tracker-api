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
        
        const commentsFromDb = await getComments({ issue_id: issue._id })
        
        if (commentsFromDb.filter(comment => comment.title == title) .length > 0)
            throw new AppError('Comment has already been registered!')
        
        const commentNumber = commentsFromDb.length

        const comment = await createNewComment(new Comment (
            title,
            text,
            issue._id,
            user_id,
            commentNumber + 1
        ))

        return comment
    }
}

export default CreateCommentService