import * as db from '../database'
import Issue from '../entities/Issue'

const COLLECTION = 'issue'

export const createNewIssue = async (issue: Issue): Promise<Issue> => {
    const results = await db.add(COLLECTION, issue) as IssueResponseInsert
    return results.ops[0]
}

export const getAll = async (): Promise<Issue[]> => {

    const issues = await db.get(COLLECTION) as Issue[]

    return issues

}

export const getBySlug = async (slug: string): Promise<Issue> => {

    if (!slug)
        return new Promise<Issue>((resolve) => resolve())

    const issues = await db.get(COLLECTION, { slug }) as Issue[]

    return issues[0]
}

export const getByName = async (name: string): Promise<Issue> => {

    if (!name)
        return new Promise<Issue>((resolve) => resolve())

    const issues = await db.get(COLLECTION, { name }) as Issue[]

    return issues[0]
}