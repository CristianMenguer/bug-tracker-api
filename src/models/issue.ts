import * as db from '../database'
import Issue from '../entities/Issue'
import Project from '../entities/Project'

const COLLECTION = 'issue'

export const createNewIssue = async (issue: Issue): Promise<Issue> => {
    const results = await db.add(COLLECTION, issue) as IssueResponseInsert
    return results.ops[0]
}

export const getAll = async (): Promise<Issue[]> => {

    const issues = await db.get(COLLECTION) as Issue[]

    return issues

}

export const getByTitleProject = async (title: string, project: Project): Promise<Issue> => {

    if (!title)
        return new Promise<Issue>((resolve) => resolve())

    const issues = await db.get(COLLECTION, { title, project }) as Issue[]

    return issues[0]
}

export const getByProject = async (project: Project): Promise<Issue[]> => {

    if (!project)
        return new Promise<Issue[]>((resolve) => resolve())

    const issues = await db.get(COLLECTION, { project }) as Issue[]

    return issues
}