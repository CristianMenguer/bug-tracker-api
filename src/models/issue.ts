import * as db from '../database'
import Issue from '../entities/Issue'
import Project from '../entities/Project'

const COLLECTION = 'issue'
const LOOKUP_PROJECT_PIPELINE = [
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
            project_id: 1,
            project: {
                $arrayElemAt: ['$project', 0]
            }
        }
    }
]

export const createNewIssue = async (issue: Issue): Promise<Issue> => {
    delete issue.project

    const results = await db.add(COLLECTION, issue) as IssueResponseInsert
    return results.ops[0]
}

export const getAll = async (): Promise<Issue[]> => {

    // const issues = await db.get(COLLECTION) as Issue[]

    const issues = await aggregateWithProject()

    return issues

}

export const aggregateWithProject = async () => {
    // @ts-ignore
    const issues = await db.aggregate(COLLECTION, LOOKUP_PROJECT_PIPELINE) as Issue[]
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
    const LOOKUP_SLUG = [...LOOKUP_PROJECT_PIPELINE, {
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
    const LOOKUP_SLUG = [...LOOKUP_PROJECT_PIPELINE, {
        $match: {
            'project.slug': slug,
            number: parseInt(number)
        }
    }]
    // @ts-ignore
    const issues = await db.aggregate(COLLECTION, LOOKUP_SLUG) as Issue[]
    return issues
}