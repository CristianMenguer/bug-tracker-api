import { IssueStatus } from '../constants/IssueStatus'
import * as db from '../database'
import Issue from '../entities/Issue'
import Project from '../entities/Project'

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
    const update = { $set: { status: newStatus, updated_at: new Date() }}

    const result = await db.update(COLLECTION, filter, update) as Issue
    
    return result
}

export const createNewIssue = async (issue: Issue): Promise<Issue> => {
    delete issue.project

    const results = await db.add(COLLECTION, issue) as IssueResponseInsert
    return results.ops[0]
}

export const getIssues = async (query = {}): Promise<Issue[]> => {

    // @ts-ignore
    const issues = await db.aggregate(COLLECTION, LOOKUP_PIPELINE, query) as Issue[]
    return issues
}

export const getByTitleProject = async (title: string, project: Project): Promise<Issue> => {

    if (!title)
        return new Promise<Issue>((resolve) => resolve())

    const issues = await db.get(COLLECTION, { title, project_id: project._id }) as Issue[]

    return issues[0]
}

export const getByProject = async (project: Project): Promise<Issue[]> => {

    if (!project)
        return new Promise<Issue[]>((resolve) => resolve())

    const issues = await db.get(COLLECTION, { project_id: project._id }) as Issue[]

    return issues
}

export const getByProjectSlug = async (slug: string) => {
    const LOOKUP_SLUG = [...LOOKUP_PIPELINE, {
        $match: {
            'project.slug': slug
        }
    }]
    //
    // @ts-ignore
    const issues = await db.aggregate(COLLECTION, LOOKUP_SLUG) as Issue[]
    return issues
}

export const getBySlugNumber = async (slug: string, number: string) => {
    const LOOKUP_SLUG = [...LOOKUP_PIPELINE, {
        $match: {
            'project.slug': slug,
            number: parseInt(number)
        }
    }]
    // @ts-ignore
    const issues = await db.aggregate(COLLECTION, LOOKUP_SLUG) as Issue[]
    return issues
}