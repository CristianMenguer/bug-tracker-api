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
            issue: {
                $arrayElemAt: ['$issue', 0]
            }
        }
    }
]

export const createNewComment = async (comment: Comment): Promise<Comment> => {
    delete comment.issue
    delete comment.user
    
    const results = await db.add(COLLECTION, comment) as IssueResponseInsert
    return results.ops[0]
}

export const getComments = async (query = {}): Promise<Comment[]> => {

    // @ts-ignore
    const comments = await db.aggregate(COLLECTION, LOOKUP_ISSUE_PIPELINE, query) as Comment[]
    return comments

}
