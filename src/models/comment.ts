import * as db from '../database'
import Comment from '../entities/Comment'

const COLLECTION = 'comment'
const LOOKUP_ISSUE_PIPELINE = [
    {
        $lookup: {
            from: 'issue',
            localField: 'issue_id',
            foreignField: '_id',
            as: 'issue',
        }
    },
    {
        $project: {
            title: 1,
            text: 1,
            issue_id: 1,
            user_id: 1,
            number: 1,
            issue: {
                $arrayElemAt: ['$issue', 0]
            }
        }
    }
]

export const createNewComment = async (comment: Comment): Promise<Comment> => {

    delete comment.issue
    delete comment.user
    try {
        const results = await db.add(COLLECTION, comment) as IssueResponseInsert
        return results.ops[0]
    } catch (err) {
        console.log('Error: > comment.model > createNewComment:')
        console.log(err)
        return {} as Comment
    }
}

export const getComments = async (query = {}): Promise<Comment[]> => {

    try {
        // @ts-ignore
        const comments = await db.aggregate(COLLECTION, LOOKUP_ISSUE_PIPELINE, query) as Comment[]
        return comments
    } catch (err) {
        console.log('Error: > comment.model > getComments:')
        console.log(err)
        return []
    }

}
