import { ObjectId } from 'mongodb'
import * as db from '../database'
import Project from '../entities/Project'

const COLLECTION = 'project'
const LOOKUP_ISSUES_PIPELINE = [
    {
        $lookup: {
            from: 'issue',
            localField: '_id',
            foreignField: 'project_id',
            as: 'issues',
        }
    }
]

export const createNewProject = async (project: Project): Promise<Project> => {
    const results = await db.add(COLLECTION, project) as ProjectResponseInsert
    return results.ops[0]
}

export const getAll = async (): Promise<Project[]> => {

    //const projects = await db.get(COLLECTION) as Project[]

    const projects = await aggregateWithIssues()

    return projects

}

export const aggregateWithIssues = async () => {

    // @ts-ignore
    const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE) as Project[]
    return projects
}

export const getBySlug = async (slug: string): Promise<Project> => {

    if (!slug)
        return new Promise<Project>((resolve) => resolve())

    // const projects = await db.get(COLLECTION, { slug }) as Project

    // @ts-ignore
    const project = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE, { slug }) as Project

    return project
}

export const getByName = async (name: string): Promise<Project> => {

    if (!name)
        return new Promise<Project>((resolve) => resolve())

    const projects = await db.get(COLLECTION, { name }) as Project[]

    return projects[0]
}

export const getById = async (_id: string): Promise<Project> => {

    if (!_id)
        return new Promise<Project>((resolve) => resolve())

    const projects = await db.get(COLLECTION, { _id: new ObjectId(_id) }) as Project[]

    return projects[0]

}