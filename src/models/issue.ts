import { IssueStatus } from '../constants/IssueStatus'
import * as db from '../database'
import Issue from '../entities/Issue'

const COLLECTION = 'issue'
const LOOKUP_PIPELINE = [
    {
        $lookup: {
            from: 'project',
            localField: 'project_id',
            foreignField: '_id',
            as: 'project',
        }
    },
    {
        $project: {
            title: 1,
            description: 1,
            status: 1,
            number: 1,
            due_date: 1,
            created_at: 1,
            updated_at: 1,
            project_id: 1,
            project: {
                $arrayElemAt: ['$project', 0]
            },
            comments: {
                $arrayElemAt: ['$comments', 0]
            }
        }
    },
    {
        $lookup: {
            from: 'comment',
            localField: '_id',
            foreignField: 'issue_id',
            as: 'comments',
        }
    }
]

export const updateIssueStatus = async (issue_id: string, newStatus: IssueStatus): Promise<Issue> => {

    const filter = { _id: issue_id }
    const update = { $set: { status: newStatus, updated_at: new Date() } }

    try {
        const result = await db.update(COLLECTION, filter, update) as Issue
        return result
    } catch (err) {
        console.log('Error: > issue.model > updateIssueStatus:')
        console.log(err)
        return {} as Issue
    }

}

export const createNewIssue = async (issue: Issue): Promise<Issue> => {
    delete issue.project

    try {
        const results = await db.add(COLLECTION, issue) as IssueResponseInsert
        return results.ops[0]
    } catch (err) {
        console.log('Error: > issue.model > createNewIssue:')
        console.log(err)
        return {} as Issue
    }
}

export const getIssues = async (query = {}): Promise<Issue[]> => {

    try {
        // @ts-ignore
        const issues = await db.aggregate(COLLECTION, LOOKUP_PIPELINE, query) as Issue[]
        //
        issues.map(async (issue) => {
            let dateToTest = new Date()
            //dateToTest.setDate(dateToTest.getDate() + 8)
            //
            if (issue.due_date < dateToTest && issue._id && issue.status != IssueStatus.CLOSED) {
                issue.status = IssueStatus.CLOSED
                await updateIssueStatus(issue._id, IssueStatus.CLOSED)
            }
        })
        //
        return issues
    } catch (err) {
        console.log('Error: > issue.model > getIssues:')
        console.log(err)
        return []
    }
}
