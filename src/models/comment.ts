import * as db from '../database'
import Issue from '../entities/Issue'
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

export const createNewComment = async (issue: Comment): Promise<Comment> => {
    // delete issue.issue

    const results = await db.add(COLLECTION, issue) as IssueResponseInsert
    return results.ops[0]
}

export const getComments = async (): Promise<Comment[]> => {

    // const issues = await db.get(COLLECTION) as Comment[]

    const issues = await aggregateWithIssue()

    return issues

}

export const aggregateWithIssue = async () => {
    // @ts-ignore
    const issues = await db.aggregate(COLLECTION, LOOKUP_ISSUE_PIPELINE) as Comment[]
    return issues
}